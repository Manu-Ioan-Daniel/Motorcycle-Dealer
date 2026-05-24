import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Footer } from "../../shared/components/index.js";
import { getMeRequest } from "../../shared/api/user.js";
import API from "../../shared/api/axios.js";

export default function DealerApplication() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        taxId: "",
        address: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const me = await getMeRequest();
            const userId = me?.userId ?? me?.id ?? null;

            await API.post("/dealers/request", {
                userId,
                taxId: formData.taxId,
                address: formData.address,
            });

            setSubmitted(true);
        } catch (error) {
            console.error("Failed to submit dealer request:", error);
            const msg = error?.response?.data?.message ?? "Failed to submit request. Please try again.";
            window.alert(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 p-6">
                <div className="max-w-2xl mx-auto">

                    {submitted ? (
                        <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm text-center">
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application submitted!</h2>
                            <p className="text-gray-600 mb-8">
                                Your dealer request has been sent. An admin will review it and activate your account shortly.
                            </p>
                            <button
                                type="button"
                                onClick={() => navigate("/catalog")}
                                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
                            >
                                Back to catalog
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-900">Apply as a dealer</h1>
                                <p className="text-gray-600 mt-2">
                                    Submit your details and we'll review your application.
                                </p>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-6 flex gap-3">
                                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                                </svg>
                                <p className="text-sm text-blue-700">
                                    Once submitted, your request will be reviewed by an admin. You'll be notified when your dealer status is activated.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Tax ID *
                                        </label>
                                        <input
                                            type="text"
                                            name="taxId"
                                            value={formData.taxId}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="e.g., RO12345678"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Business address *
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="e.g., Str. Exemplu nr. 1, Cluj-Napoca"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-4">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                                    >
                                        {submitting ? "Submitting..." : "Submit application"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </>
                    )}

                </div>
            </main>

            <Footer />
        </div>
    );
}