import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMeRequest } from "../../../shared/api/user.js";

export function useSessionGuard(intervalMs = 5000) {
    const navigate = useNavigate();

    useEffect(() => {
        const check = async () => {
            try {
                const res = await getMeRequest();
                const user = res?.data ?? res;

                if (user?.status === "SUSPENDED" || user?.status === "DELETED") {
                    localStorage.clear();
                    navigate("/login", { state: { reason: "account_suspended" } });
                }
            } catch (error) {
                const status = error?.response?.status;
                if (status === 401 || status === 403) {
                    localStorage.clear();
                    navigate("/login", { state: { reason: "session_expired" } });
                }
            }
        };

        check();
        const interval = setInterval(check, intervalMs);
        return () => clearInterval(interval);
    }, [intervalMs, navigate]);
}