import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // Use the environment variable for the base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;