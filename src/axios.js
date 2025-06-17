import axios from "axios";

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: "http://localhost:8000", // Laravel API URL
  withCredentials: true, // Allows cookies (important for Sanctum)
});

// Function to get CSRF token
// export const getCsrfToken = async () => {
//   await api.get("/sanctum/csrf-cookie");
// };

export default api;