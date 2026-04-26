import { NavLink } from "react-router-dom";
import {isLoggedIn} from "../utils/utils.js";
import {useEffect, useState} from "react";

export default function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            const result = await isLoggedIn();
            setLoggedIn(result);
        }

        checkAuth();
    }, []);

    const navItems = [
        { label: "Login", path: "/login", auth: "guest" },
        { label: "Catalog", path: "/catalog", auth: "user" },
        { label: "Profile", path: "/profile", auth: "user" },
    ];

    return (
        <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">MotoShop</h1>

            <div className="flex gap-4 items-center">
                {navItems.filter(item => {
                    if (item.auth === "guest") return !loggedIn;
                    return loggedIn;
                })
                    .map(item => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-600 hover:text-blue-600"
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}

                {loggedIn && (
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                        👤
                    </div>
                )}
            </div>
        </nav>
    );
}