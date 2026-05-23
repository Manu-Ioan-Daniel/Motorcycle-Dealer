import { NavLink, useNavigate } from "react-router-dom";
import {isLoggedIn, logout as logoutHelper} from "../utils/utils.js";
import {useEffect, useState} from "react";
import { getMeRequest } from "../api/user.js";

export default function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuth() {
            const result = await isLoggedIn();
            setLoggedIn(result);

            if (result) {
                try {
                    const userData = await getMeRequest();
                    setRole(userData?.role);
                } catch (error) {
                    console.warn("Could not fetch user role:", error);
                }
            }
        }

        checkAuth();
    }, []);

    return (
        <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">MotoShop</h1>

            <div className="flex items-center gap-6">
                {/* Guest: Login */}
                {!loggedIn && (
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                        }
                    >
                        Login
                    </NavLink>
                )}

                {/* Logged in: all items on right */}
                {loggedIn && (
                    <>
                        <NavLink
                            to="/catalog"
                            className={({ isActive }) =>
                                isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                            }
                        >
                            Catalog
                        </NavLink>

                        {role === "DEALER" && (
                            <>
                                <NavLink
                                    to="/my-listings"
                                    className={({ isActive }) =>
                                        isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                                    }
                                >
                                    My Listings
                                </NavLink>

                                <NavLink
                                    to="/manage-inquiries"
                                    className={({ isActive }) =>
                                        isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                                    }
                                >
                                    Manage Inquiries
                                </NavLink>
                            </>
                        )}

                        <button
                            onClick={() => {
                                logoutHelper();
                                setLoggedIn(false);
                                setRole(null);
                                navigate('/login');
                            }}
                            className="text-gray-600 hover:text-red-600"
                        >
                            Logout
                        </button>

                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                            }
                        >
                            Profile
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}