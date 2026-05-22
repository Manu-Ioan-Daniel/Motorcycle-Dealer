import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header, Footer } from "../../../shared/components/index.js";
import { fetchPurchaseInquiries, fetchMotorcycleDetails, deletePurchaseInquiry } from "../api/bikes.js";
import { getBikeImage } from "../utils/catalogUitls.js";

export default function PurchaseInquiryDetails() {
    const { inquiryId } = useParams();
    const navigate = useNavigate();
    const [inquiry, setInquiry] = useState(null);
    const [motorcycle, setMotorcycle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const inquiries = await fetchPurchaseInquiries();
                const foundInquiry = inquiries.find((item) => String(item.id) === String(inquiryId));

                if (!foundInquiry) {
                    setInquiry(null);
                } else {
                    setInquiry(foundInquiry);

                    try {
                        const bikeId = foundInquiry.motorcycleListingId ?? foundInquiry.listingId ?? foundInquiry.motorcycleId ?? null;
                        if (bikeId) {
                            const motoDetails = await fetchMotorcycleDetails(bikeId);
                            setMotorcycle(motoDetails);
                        } else {
                            setMotorcycle(null);
                        }
                    } catch (bioError) {
                        console.warn("Failed to load motorcycle details:", bioError);
                        setMotorcycle(null);
                    }
                }
            } catch (error) {
                console.error("Failed to load inquiry details:", error);
                setInquiry(null);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [inquiryId]);

    const image = useMemo(() => {
        if (!motorcycle) return "/favicon.svg";
        return getBikeImage(motorcycle);
    }, [motorcycle]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <div className="flex-1 flex items-center justify-center text-gray-500">
                    Loading inquiry details...
                </div>
                <Footer />
            </div>
        );
    }

    if (!inquiry) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-1 p-6">
                    <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900">Inquiry not found</h1>
                        <button
                            type="button"
                            onClick={() => navigate("/manage-inquiries")}
                            className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition"
                        >
                            Back to inquiries
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-5">
                        <Link
                            to="/manage-inquiries"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            ← Back to inquiries
                        </Link>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Motorcycle Details */}
                        {motorcycle ? (
                            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                <img
                                    src={image}
                                    alt={`${motorcycle.brand} ${motorcycle.model}`}
                                    className="w-full object-cover"
                                    style={{ height: "300px" }}
                                    onError={(e) => {
                                        e.currentTarget.src = "/favicon.svg";
                                    }}
                                />
                                <div className="p-6">
                                    <p className="text-xs font-semibold uppercase tracking-[2px] text-gray-500">
                                        {motorcycle.brand}
                                    </p>
                                    <h2 className="mt-1 text-2xl font-bold text-gray-900">
                                        {motorcycle.model}
                                    </h2>
                                    <p className="mt-1 text-gray-500">{motorcycle.year}</p>
                                    <div className="mt-4 text-2xl font-bold text-gray-900">
                                        €{Number(motorcycle.price).toLocaleString()}
                                    </div>
                                    <div className="mt-6 grid grid-cols-2 gap-3">
                                        <div className="rounded-lg bg-gray-100 px-4 py-3">
                                            <div className="text-[11px] uppercase tracking-wide text-gray-400">
                                                Mileage
                                            </div>
                                            <div className="text-sm font-semibold text-gray-900">
                                                {Number(motorcycle.mileage).toLocaleString()} km
                                            </div>
                                        </div>
                                        <div className="rounded-lg bg-gray-100 px-4 py-3">
                                            <div className="text-[11px] uppercase tracking-wide text-gray-400">
                                                Stock
                                            </div>
                                            <div className="text-sm font-semibold text-gray-900">
                                                {motorcycle.stockQty} units
                                            </div>
                                        </div>
                                        <div className="rounded-lg bg-gray-100 px-4 py-3">
                                            <div className="text-[11px] uppercase tracking-wide text-gray-400">
                                                Color
                                            </div>
                                            <div className="text-sm font-semibold text-gray-900">
                                                {motorcycle.color}
                                            </div>
                                        </div>
                                        <div className="rounded-lg bg-gray-100 px-4 py-3">
                                            <div className="text-[11px] uppercase tracking-wide text-gray-400">
                                                Type
                                            </div>
                                            <div className="text-sm font-semibold text-gray-900">
                                                {motorcycle.type}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center text-gray-500">
                                Motorcycle details unavailable
                            </div>
                        )}

                        {/* Buyer Details */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Buyer Information</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                        Full Name
                                    </label>
                                    <p className="mt-1 text-base text-gray-900">{inquiry.fullName}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                        Email
                                    </label>
                                    <p className="mt-1 text-base text-gray-900">
                                        <a
                                            href={`mailto:${inquiry.email}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {inquiry.email}
                                        </a>
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                        Phone
                                    </label>
                                    <p className="mt-1 text-base text-gray-900">
                                        <a
                                            href={`tel:${inquiry.phoneNumber}`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            {inquiry.phoneNumber}
                                        </a>
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                        Address
                                    </label>
                                    <p className="mt-1 text-base text-gray-900">{inquiry.address}</p>
                                </div>

                                {inquiry.message && (
                                    <div>
                                        <label className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                            Message
                                        </label>
                                        <p className="mt-1 text-base text-gray-900 whitespace-pre-wrap">
                                            {inquiry.message}
                                        </p>
                                    </div>
                                )}

                                <div className="mt-6 flex gap-3">
                                    <button
                                        type="button"
                                        disabled={actionLoading}
                                        onClick={async () => {
                                            if (!inquiry) return;
                                            setActionLoading(true);
                                            try {
                                                const listingId = inquiry.motorcycleListingId ?? inquiry.listingId ?? inquiry.motorcycleId;
                                                await deletePurchaseInquiry(listingId, inquiry.id);
                                                // navigate back to manage inquiries
                                                navigate("/manage-inquiries");
                                            } catch (err) {
                                                console.error("Failed to delete inquiry:", err);
                                                window.alert("Failed to delete inquiry. Please try again.");
                                            } finally {
                                                setActionLoading(false);
                                            }
                                        }}
                                        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {actionLoading ? "Processing..." : "Approve"}
                                    </button>

                                    <button
                                        type="button"
                                        disabled={actionLoading}
                                        onClick={async () => {
                                            if (!inquiry) return;
                                            if (!window.confirm("Are you sure you want to deny and delete this inquiry?")) return;
                                            setActionLoading(true);
                                            try {
                                                const listingId = inquiry.motorcycleListingId ?? inquiry.listingId ?? inquiry.motorcycleId;
                                                await deletePurchaseInquiry(listingId, inquiry.id);
                                                navigate("/manage-inquiries");
                                            } catch (err) {
                                                console.error("Failed to delete inquiry:", err);
                                                window.alert("Failed to delete inquiry. Please try again.");
                                            } finally {
                                                setActionLoading(false);
                                            }
                                        }}
                                        className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                                    >
                                        {actionLoading ? "Processing..." : "Deny"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

