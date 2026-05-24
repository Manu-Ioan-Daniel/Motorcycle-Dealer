import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header, Footer } from "../../../shared/components/index.js";
import { fetchPurchaseInquiries, fetchMotorcycleDetails } from "../api/bikes.js";

export default function ManagePurchaseInquiries() {
    const navigate = useNavigate();
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [motorcycleMap, setMotorcycleMap] = useState({});

    useEffect(() => {
        const loadInquiries = async () => {
            try {
                const data = await fetchPurchaseInquiries();
                const list = Array.isArray(data) ? data : [];
                setInquiries(list);

                const ids = Array.from(
                    new Set(
                        list
                            .map((i) => i.motorcycleListingId ?? i.listingId ?? i.motorcycleId ?? null)
                            .filter(Boolean)
                    )
                );

                if (ids.length > 0) {
                    try {
                        const results = await Promise.all(
                            ids.map((id) =>
                                fetchMotorcycleDetails(id)
                                    .then((res) => [id, res])
                                    .catch(() => [id, null])
                            )
                        );

                        const map = {};
                        for (const [id, moto] of results) {
                            if (moto) map[id] = moto;
                        }
                        setMotorcycleMap(map);
                    } catch (e) {
                        console.warn("Failed to fetch motorcycle details for inquiries:", e);
                    }
                }
            } catch (error) {
                console.error("Failed to load purchase inquiries:", error);
                setInquiries([]);
            } finally {
                setLoading(false);
            }
        };

        loadInquiries();
        const interval = setInterval(loadInquiries, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Manage Purchase Inquiries</h1>
                        <p className="text-gray-600 mt-2">View and manage all purchase inquiries for your motorcycles</p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-24 text-gray-500">
                            Loading inquiries...
                        </div>
                    ) : inquiries.length === 0 ? (
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
                            <p className="text-gray-600">No purchase inquiries yet.</p>
                            <Link to="/catalog" className="mt-4 inline-block text-blue-600 hover:underline">
                                Go to catalog
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm">
                                <thead className="bg-gray-100 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Motorcycle
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Buyer Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                            Phone
                                        </th>
                                        <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inquiries.map((inquiry) => (
                                        <tr
                                            key={inquiry.id}
                                            className="border-b border-gray-200 hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {(() => {
                                                    const bikeId = inquiry.motorcycleListingId ?? inquiry.listingId ?? inquiry.motorcycleId ?? inquiry.listing_id ?? null;
                                                    const moto = bikeId ? motorcycleMap[bikeId] : null;
                                                    if (moto) return `${moto.brand ?? ""} ${moto.model ?? ""}`.trim();
                                                    if (bikeId) return "Loading...";
                                                    return "Unknown";
                                                })()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {inquiry.fullName}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {inquiry.email}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {inquiry.phoneNumber}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/inquiry/${inquiry.id}`)}
                                                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                                >
                                                    View Details
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

