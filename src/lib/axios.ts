import axios, { AxiosInstance } from "axios";

// Create an instance of Axios with the base URL pointing to port 8000
const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true, // Include if you're using cookies for authentication
});

export default api;
