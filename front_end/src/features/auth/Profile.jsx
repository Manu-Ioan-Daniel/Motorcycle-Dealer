import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Footer } from "../../shared/components/index.js";
import { getMeRequest } from "../../shared/api/user.js";

export default function Profile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            setLoading(true);
            try {
                const data = await getMeRequest();
                setUser(data ?? null);
            } catch (err) {
                console.error("Failed to load user:", err);
                setError("Could not load user information");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                        <p className="text-gray-600 mt-2">Account information</p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-24 text-gray-500">Loading user...</div>
                    ) : error ? (
                        <div className="bg-white border border-red-200 rounded-2xl p-8 text-center">
                            <p className="text-red-600">{error}</p>
                        </div>
                    ) : !user ? (
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
                            <p className="text-gray-600">No user information available.</p>
                        </div>
                    ) : (
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <div className="text-sm text-gray-500 uppercase">User ID</div>
                                    <div className="text-lg font-medium text-gray-900">{user.userId ?? user.id}</div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-500 uppercase">Role</div>
                                    <div className="text-lg font-medium text-gray-900">{user.role ?? "USER"}</div>
                                </div>

                                {user.email && (
                                    <div>
                                        <div className="text-sm text-gray-500 uppercase">Email</div>
                                        <div className="text-lg font-medium text-gray-900">{user.email}</div>
                                    </div>
                                )}

                                <div className="pt-4">
                                    <button
                                        type="button"
                                        onClick={() => navigate("/catalog")}
                                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                    >
                                        Go to catalog
                                    </button>

                                    {user.role === "DEALER" && (
                                        <button
                                            type="button"
                                            onClick={() => navigate("/manage-inquiries")}
                                            className="ml-3 inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                                        >
                                            Manage Purchase Inquiries
                                        </button>
                                    )}
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

