import axios from "axios";
import Cookies from "js-cookie";

let getAccessToken = (): string | undefined => {
  // Default: assume client-side (browser)
  if (typeof window !== "undefined") {
    return Cookies.get("accessToken"); 
  }

  // If server-side, dynamically import next/headers
  const { cookies } = require("next/headers");
  const serverCookies = cookies();
  return serverCookies.get("accessToken")?.value;
};

// Create Axios client instance
export const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api/",
});

// Add a request interceptor to inject the token dynamically
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers = {
        ...config.headers, // Preserve existing headers
        authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);
