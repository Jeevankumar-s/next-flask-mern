import axios from "axios";

// Set up the base URL for your API
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/", // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: You can add an interceptor for handling requests or responses if needed (e.g., authorization token)

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export the API instance for use in your components
export default API;
