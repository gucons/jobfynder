import axios, { AxiosInstance } from "axios";

// Create an instance of Axios with the base URL pointing to port 8000
const api: AxiosInstance = axios.create({
    baseURL: "http://jobfynder.com/:8000/api/v1",
    withCredentials: true, // Include if you're using cookies for authentication
});

// Export the Axios instance for use in other files
export default api;
