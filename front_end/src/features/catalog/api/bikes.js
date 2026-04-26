import API from "../../../shared/api/axios.js";

export const fetchBikes = () => API.get("/catalog/bikes").then(res => res.data);
