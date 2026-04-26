import API from "../../../shared/api/axios.js";

export const loginRequest = (data) => API.post("/auth/login", data)
export const registerRequest = (data) => API.post("/auth/register", {...data, phoneNumber: data.phone});