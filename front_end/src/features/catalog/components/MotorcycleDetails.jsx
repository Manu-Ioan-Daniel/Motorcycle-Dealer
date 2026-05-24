import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Header, Footer } from "../../../shared/components/index.js";
import { fetchBikes, isInWishlist, addToWishlist, removeFromWishlist } from "../api/bikes.js";
import { getBikeImage } from "../utils/catalogUitls.js";
import { getMeRequest } from "../../../shared/api/user.js";

export default function MotorcycleDetails() {
    const { bikeId } = useParams();
    const navigate = useNavigate();
    const [bike, setBike] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [wishlisted, setWishlisted] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const userRes = await getMeRequest();
                const currentUserId = userRes.userId;
                setUserId(currentUserId);

                const bikes = await fetchBikes();
                const selected = bikes.find((item) => String(item.id) === String(bikeId));
                setBike(selected ?? null);

                if (currentUserId) {
                    const inWishlist = await isInWishlist(bikeId, currentUserId);
                    setWishlisted(inWishlist);
                }
            } catch (error) {
                console.error("Failed to load motorcycle details:", error);
                setBike(null);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [bikeId]);

    const image = useMemo(() => {
        if (!bike) return "/favicon.svg";
        return getBikeImage(bike);
    }, [bike]);

    const handlePurchase = () => {
        if (!bike) return;
        navigate(`/catalog/${bikeId}/purchase`);
    };

    const handleWishlist = async () => {
        console.log(bike, userId)
        if (!bike || !userId) return;

        setWishlistLoading(true);
        try {
            if (wishlisted) {

                await removeFromWishlist(bikeId, userId);
                setWishlisted(false);

            } else {
                await addToWishlist(bikeId, userId);
                setWishlisted(true);
            }
        } catch (error) {
            console.error("Failed to update wishlist:", error);
            window.alert("Failed to update wishlist. Please try again.");
        } finally {
            setWishlistLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-5">
                        <Link to="/catalog" className="text-sm text-blue-600 hover:underline">
                            ← Back to catalog
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-24 text-gray-500">
                            Loading motorcycle details...
                        </div>
                    ) : !bike ? (
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
                            <h1 className="text-2xl font-bold text-gray-900">Motorcycle not found</h1>
                            <p className="text-gray-600 mt-2">
                                The motorcycle you selected is unavailable or has been removed.
                            </p>
                            <button
                                type="button"
                                onClick={() => navigate("/catalog")}
                                className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition"
                            >
                                Return to catalog
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-2">
                            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                                <img
                                    src={image}
                                    alt={`${bike.brand} ${bike.model}`}
                                    className="w-full object-cover"
                                    style={{ height: "420px" }}
                                    onError={(e) => {
                                        e.currentTarget.src = "/favicon.svg";
                                    }}
                                />
                            </div>

                            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-[2px] text-gray-500">
                                    {bike.brand}
                                </p>
                                <h1 className="mt-1 text-4xl font-bold text-gray-900">{bike.model}</h1>
                                <p className="mt-2 text-gray-500">{bike.year}</p>

                                <div className="mt-5 text-3xl font-bold text-gray-900">
                                    €{Number(bike.price).toLocaleString()}
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    <div className="rounded-lg bg-gray-100 px-4 py-3">
                                        <div className="text-[11px] uppercase tracking-wide text-gray-400">
                                            Mileage
                                        </div>
                                        <div className="text-sm font-semibold text-gray-900">
                                            {Number(bike.mileage).toLocaleString()} km
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 px-4 py-3">
                                        <div className="text-[11px] uppercase tracking-wide text-gray-400">
                                            Stock
                                        </div>
                                        <div className="text-sm font-semibold text-gray-900">
                                            {bike.stockQty} units
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 px-4 py-3">
                                        <div className="text-[11px] uppercase tracking-wide text-gray-400">
                                            Color
                                        </div>
                                        <div className="text-sm font-semibold text-gray-900">
                                            {bike.color}
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 px-4 py-3">
                                        <div className="text-[11px] uppercase tracking-wide text-gray-400">
                                            Type
                                        </div>
                                        <div className="text-sm font-semibold text-gray-900">
                                            {bike.type}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center gap-2">
                                    <span
                                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                                            bike.status === "Available"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {bike.status}
                                    </span>
                                </div>

                                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                    <button
                                        type="button"
                                        onClick={handlePurchase}
                                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                                    >
                                        Purchase
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleWishlist}
                                        disabled={wishlistLoading}
                                        className={`inline-flex items-center justify-center rounded-lg px-5 py-3 font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed ${
                                            wishlisted
                                                ? "bg-red-600 hover:bg-red-700"
                                                : "bg-gray-900 hover:bg-gray-800"
                                        }`}
                                    >
                                        {wishlisted ? "Remove from wishlist" : " Add to wishlist"}
                                    </button>
                                    
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/catalog/${bikeId}/test-ride`)}
                                        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 sm:col-span-2"
                                    >
                                        Schedule Test Ride
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
