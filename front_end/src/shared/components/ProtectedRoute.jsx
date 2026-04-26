import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../utils/utils.js";

export default function ProtectedRoute({ children }) {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        async function checkAuth() {
            const result = await isLoggedIn();
            setAuth(result);
        }

        checkAuth();
    }, []);

    if (auth === null) {
        return <div>Loading...</div>;
    }

    if (!auth) {
        return <Navigate to="/login" replace />;
    }

    return children;
}