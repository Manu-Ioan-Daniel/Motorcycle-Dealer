import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Header, Footer } from "../../../shared/components/index.js";
import { fetchBikes, submitPurchaseInquiry } from "../api/bikes.js";
import { getBikeImage } from "../utils/catalogUitls.js";

export default function PurchaseInquiry() {
    const { bikeId } = useParams();
    const navigate = useNavigate();
    const [bike, setBike] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            address: "",
            message: "",
        },
    });

    useEffect(() => {
        const loadBike = async () => {
            try {
                const bikes = await fetchBikes();
                const selected = bikes.find((item) => String(item.id) === String(bikeId));
                setBike(selected ?? null);
            } catch (error) {
                console.error("Failed to load motorcycle:", error);
                setBike(null);
            } finally {
                setLoading(false);
            }
        };

        loadBike();
    }, [bikeId]);

    const image = useMemo(() => {
        if (!bike) return "/favicon.svg";
        return getBikeImage(bike);
    }, [bike]);

    const onSubmit = async (data) => {
        if (!bike) return;

        setSubmitting(true);
        try {
            await submitPurchaseInquiry(bikeId, {
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phone,
                address: data.address,
                message: data.message,
            });
            setSuccess(true);
            reset();
            setTimeout(() => {
                navigate(`/catalog/${bikeId}`);
            }, 3000);
        } catch (error) {
            console.error("Failed to submit purchase inquiry:", error);
            const msg = error?.response?.data?.message ?? "Failed to submit inquiry. Please try again.";
            window.alert(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-5">
                        <Link to={`/catalog/${bikeId}`} className="text-sm text-blue-600 hover:underline">
                            ← Back to motorcycle details
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-24 text-gray-500">
                            Loading motorcycle...
                        </div>
                    ) : !bike ? (
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
                            <h1 className="text-2xl font-bold text-gray-900">Motorcycle not found</h1>
                            <button
                                type="button"
                                onClick={() => navigate("/catalog")}
                                className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition"
                            >
                                Return to catalog
                            </button>
                        </div>
                    ) : success ? (
                        <div className="bg-white border border-green-200 rounded-2xl p-8 text-center shadow-sm">
                            <div className="mb-4">
                                <svg
                                    className="w-16 h-16 mx-auto text-green-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">Inquiry Submitted!</h1>
                            <p className="text-gray-600 mt-2">
                                Your purchase inquiry for the {bike.brand} {bike.model} has been submitted successfully.
                            </p>
                            <p className="text-gray-500 mt-4 text-sm">Redirecting you back in a few seconds...</p>
                        </div>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-2">
                            {/* Motorcycle Summary */}
                            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                <img
                                    src={image}
                                    alt={`${bike.brand} ${bike.model}`}
                                    className="w-full object-cover"
                                    style={{ height: "300px" }}
                                    onError={(e) => {
                                        e.currentTarget.src = "/favicon.svg";
                                    }}
                                />
                                <div className="p-6">
                                    <p className="text-xs font-semibold uppercase tracking-[2px] text-gray-500">
                                        {bike.brand}
                                    </p>
                                    <h2 className="mt-1 text-2xl font-bold text-gray-900">{bike.model}</h2>
                                    <p className="mt-1 text-gray-500">{bike.year}</p>
                                    <div className="mt-4 text-2xl font-bold text-gray-900">
                                        €{Number(bike.price).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {/* Inquiry Form */}
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Submit Your Inquiry</h3>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            {...register("fullName", {
                                                required: "Full name is required",
                                            })}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors.fullName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address",
                                                },
                                            })}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            placeholder="+40 123 456 7890"
                                            {...register("phone", {
                                                required: "Phone number is required",
                                            })}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input
                                            type="text"
                                            placeholder="123 Main Street, City, Country"
                                            {...register("address", {
                                                required: "Address is required",
                                            })}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors.address && (
                                            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Message (Optional)
                                        </label>
                                        <textarea
                                            placeholder="Tell us more about your interest..."
                                            rows="4"
                                            {...register("message")}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? "Submitting..." : "Submit Inquiry"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

