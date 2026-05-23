import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Footer } from "../../shared/components/index.js";
import { getMeRequest } from "../../shared/api/user.js";
import {fetchDealerListings, fetchMotorcycleDetails} from "./api/bikes.js";

export default function MyListings() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const me = await getMeRequest();
                const meData = me?.data ?? me;
                const dealerId = meData?.userId ?? meData?.id ?? null;

                if (!dealerId) {
                    console.log("MyListings: no dealerId", meData);
                    setListings([]);
                    return;
                }

                const data = await fetchDealerListings(dealerId);
                const enriched = [];

                for (const listing of data) {
                    const listingId = listing.id.motorcycleListingId;
                    const motoDetails = await fetchMotorcycleDetails(listingId);
                    enriched.push({
                        ...listing,
                        brand: motoDetails.brand,
                        model: motoDetails.model,
                        price: motoDetails.price,
                        status: motoDetails.status,
                        year: motoDetails.year,
                        mileage: motoDetails.mileage,
                        color: motoDetails.color,
                        type: motoDetails.type,
                        stockQty: motoDetails.stockQty,
                    });
                }

                setListings(enriched);

            } catch (err) {
                console.error("Failed to load dealer listings:", err);
                setListings([]);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
                            <p className="text-gray-600 mt-2">Your motorcycle listings (editable)</p>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={() => navigate('/add-listing')}
                                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                            >
                                Create Listing
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-24 text-gray-500">Loading listings...</div>
                    ) : listings.length === 0 ? (
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
                            <p className="text-gray-600">You have no listings yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm">
                                <thead className="bg-gray-100 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Motorcycle</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                                        <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {listings.map((l) => (
                                    <tr key={l.id.motorcycleListingId} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-sm text-gray-900">{`${l.brand ?? ''} ${l.model ?? ''}`.trim()}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">€{Number(l.price).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{l.status}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                type="button"
                                                onClick={() => navigate('/edit-listing', { state: { listing: l } })}
                                                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

