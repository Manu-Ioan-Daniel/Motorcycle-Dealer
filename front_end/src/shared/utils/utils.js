import {getMeRequest} from "../api/user.js";

export function getToken() {
    return localStorage.getItem("token");
}

export async function isLoggedIn() {
    const token = getToken();

    if (!token) return false;

    try {
        await getMeRequest()
        return true;
    } catch {
        localStorage.removeItem("token");
        return false;
    }
}
