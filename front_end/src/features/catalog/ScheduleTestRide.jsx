import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header, Footer } from "../../shared/components/index.js";
import { fetchTestRides, submitTestRide } from "./api/bikes.js";
import {getMeRequest} from "../../shared/api/user.js";

export default function ScheduleTestRide() {
    const { bikeId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [takenDates, setTakenDates] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    const today = new Date().toISOString().split("T")[0];

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const load = async () => {
            const userRes = await getMeRequest();
            setUserId(userRes.data?.userId ?? userRes?.userId);
            const rides = await fetchTestRides();
            const taken = rides
                .filter(r => String(r.motorcycleListingId) === String(bikeId))
                .map(r => r.scheduledDate?.split("T")[0]);
            setTakenDates(taken);
        };
        load().finally(() => setLoading(false));
    }, [bikeId]);

    const isDateTaken = takenDates.includes(selectedDate);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isDateTaken) {
            window.alert("This date is already taken. Please choose another.");
            return;
        }

        setSubmitting(true);
        try {
            await submitTestRide({
                userId: userId,
                motorcycleListingId: Number(bikeId),
                scheduledDate: `${selectedDate}T10:00:00`,
            });
            window.alert("Test ride scheduled successfully!");
            navigate(`/catalog/${bikeId}`);
        } catch (error) {
            console.error("Failed to schedule test ride:", error);
            const msg = error?.response?.data?.message ?? "Failed to schedule. Please try again.";
            window.alert(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1 p-6">
                <div className="max-w-lg mx-auto">
                    <div className="mb-5">
                        <button
                            type="button"
                            onClick={() => navigate(`/catalog/${bikeId}`)}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            ← Back to listing
                        </button>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">Schedule a Test Ride</h1>
                        <p className="text-gray-500 text-sm mb-6">Pick an available date and leave your name.</p>

                        {loading ? (
                            <div className="text-gray-500 text-center py-8">Loading available dates...</div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="e.g. John Doe"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Preferred Date *
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        min={today}
                                        required
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {isDateTaken && selectedDate && (
                                        <p className="mt-2 text-sm text-red-600">
                                            This date is already booked. Please choose another.
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting || isDateTaken}
                                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
                                >
                                    {submitting ? "Scheduling..." : "Confirm Test Ride"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}