import API from "./axios.js";

export const getMeRequest = () => API.get("/auth/me");