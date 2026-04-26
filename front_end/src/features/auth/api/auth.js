import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api"
})

API.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");
   if(token){
       config.headers.Authorization = `Bearer ${token}`;
   }
});


export const loginRequest = (data) => API.post("/auth/login", data)
export const registerRequest = (data) => API.post("/auth/register", {...data, phoneNumber: data.phone});