import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "";
const baseURL = apiUrl.endsWith("/api") ? apiUrl : `${apiUrl}/api`;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;