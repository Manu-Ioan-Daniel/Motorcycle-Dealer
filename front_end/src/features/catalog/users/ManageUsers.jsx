import { useEffect, useState } from "react";
import { Header, Footer } from "../../../shared/components/index.js";
import API from "../../../shared/api/axios.js";

const roleStyles = {
    ADMIN:   "bg-purple-100 text-purple-700",
    DEALER:  "bg-blue-100 text-blue-700",
    USER:    "bg-gray-100 text-gray-600",
};

export default function ManageUsers() {
    const [users, setUsers]     = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch]   = useState("");

    const fetchUsers = async () => {
        try {
            const res = await API.get("/users");
            setUsers(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
        const interval = setInterval(fetchUsers, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSuspend = async (userId) => {
        try {
            await API.put(`/users/${userId}/suspend`);
            setUsers((prev) =>
                prev.map((u) => u.id === userId ? { ...u, status: "SUSPENDED" } : u)
            );
        } catch (err) {
            console.error("Failed to suspend user:", err);
            window.alert("Failed to suspend user. Please try again.");
        }
    };

    const handleActivate = async (userId) => {
        try {
            await API.put(`/users/${userId}/activate`);
            setUsers((prev) =>
                prev.map((u) => u.id === userId ? { ...u, status: "ACTIVE" } : u)
            );
        } catch (err) {
            console.error("Failed to activate user:", err);
            window.alert("Failed to activate user. Please try again.");
        }
    };

    const filtered = users.filter((u) =>
        u.role !== "ADMIN" &&
        (u.username?.toLowerCase().includes(search.toLowerCase()) ||
            String(u.id).includes(search))
    );

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 p-6">
                <div className="max-w-6xl mx-auto">

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                        <p className="text-gray-600 mt-2">View and manage all registered users</p>
                    </div>

                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search by username or ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full max-w-sm border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-24 text-gray-500">
                            Loading users...
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
                            <p className="text-gray-600">No users found.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm">
                                <thead className="bg-gray-100 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Username</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filtered.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-500">#{user.id}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.username}</td>
                                        <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleStyles[user.role] ?? "bg-gray-100 text-gray-600"}`}>
                                                    {user.role}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    user.status === "SUSPENDED"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-green-100 text-green-700"
                                                }`}>
                                                    {user.status}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {user.status === "SUSPENDED" ? (
                                                <button
                                                    type="button"
                                                    onClick={() => handleActivate(user.id)}
                                                    className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-green-700 transition"
                                                >
                                                    Activate
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => handleSuspend(user.id)}
                                                    className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-700 transition"
                                                >
                                                    Suspend
                                                </button>
                                            )}
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