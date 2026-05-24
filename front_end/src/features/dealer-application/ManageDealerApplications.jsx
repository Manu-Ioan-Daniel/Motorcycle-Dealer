import { useEffect, useState } from "react";
import { Header, Footer } from "../../shared/components/index.js";
import API from "../../shared/api/axios.js";

const STATUS = {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    DENIED: "DENIED",
};

const statusStyles = {
    PENDING:  "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    DENIED:   "bg-red-100 text-red-700",
};

export default function ManageDealerApplications() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [filter, setFilter]     = useState("ALL");

    const fetchRequests = async () => {
        try {
            const res = await API.get("/dealers/requests");
            setRequests(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Failed to fetch dealer requests:", err);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
        const interval = setInterval(fetchRequests, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleApprove = async (id) => {
        try {
            await API.put(`/dealers/requests/${id}?status=APPROVED`);
            setRequests((prev) =>
                prev.map((r) => r.id === id ? { ...r, requestStatus: "APPROVED" } : r)
            );
        } catch (err) {
            console.error("Failed to approve request:", err);
            window.alert("Failed to approve request. Please try again.");
        }
    };

    const handleDeny = async (id) => {
        try {
            await API.put(`/dealers/requests/${id}?status=DENIED`);
            setRequests((prev) =>
                prev.map((r) => r.id === id ? { ...r, requestStatus: "DENIED" } : r)
            );
        } catch (err) {
            console.error("Failed to deny request:", err);
            window.alert("Failed to deny request. Please try again.");
        }
    };

    const filtered = filter === "ALL"
        ? requests
        : requests.filter((r) => r.requestStatus === filter);

    const counts = {
        ALL:      requests.length,
        PENDING:  requests.filter((r) => r.requestStatus === STATUS.PENDING).length,
        APPROVED: requests.filter((r) => r.requestStatus === STATUS.APPROVED).length,
        DENIED:   requests.filter((r) => r.requestStatus === STATUS.DENIED).length,
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Dealer Requests</h1>
                        <p className="text-gray-600 mt-2">Review and manage dealer applications</p>
                    </div>

                    {/* Filter tabs */}
                    <div className="flex gap-2 mb-6 flex-wrap">
                        {["ALL", "PENDING", "APPROVED", "DENIED"].map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setFilter(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                                    filter === tab
                                        ? "bg-gray-900 text-white"
                                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                {tab} <span className="ml-1 opacity-60">({counts[tab]})</span>
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-24 text-gray-500">
                            Loading requests...
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
                            <p className="text-gray-600">No requests found.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm">
                                <thead className="bg-gray-100 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">User ID</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tax ID</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Address</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filtered.map((req) => (
                                    <tr
                                        key={req.id}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-500">#{req.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{req.userId}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-mono">{req.taxId}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{req.address}</td>
                                        <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[req.requestStatus] ?? "bg-gray-100 text-gray-600"}`}>
                                                    {req.requestStatus ?? "PENDING"}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleApprove(req.id)}
                                                    disabled={req.requestStatus === STATUS.APPROVED}
                                                    className="inline-flex items-center justify-center rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeny(req.id)}
                                                    disabled={req.requestStatus === STATUS.DENIED}
                                                    className="inline-flex items-center justify-center rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
                                                >
                                                    Deny
                                                </button>
                                            </div>
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