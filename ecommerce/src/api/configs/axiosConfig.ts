// import { BaseUrl } from "@/utils/BaseUrl";
// import axios from "axios";
// import Cookies from "js-cookie";

// let getAccessToken = (): string | undefined => {
//   // Default: assume client-side (browser)
//   if (typeof window !== "undefined") {
//     return Cookies.get("userAccessToken");
//   }

//   // If server-side, dynamically import next/headers
//   const { cookies } = require("next/headers");
//   const serverCookies = cookies();
//   return serverCookies.get("userAccessToken")?.value;
// };

// // Create Axios client instance
// const apiAxios = axios.create({
//   baseURL: BaseUrl,
// });

// // Add a request interceptor to inject the token dynamically
// apiAxios.interceptors.request.use(
//   (config) => {
//     const userAccessToken = getAccessToken();

//     if (userAccessToken) {
//       config.headers = {
//         ...config.headers, // Preserve existing headers
//         authorization: `Bearer ${userAccessToken}`,
//       };
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );
// export default apiAxios;

import { BaseUrl } from "@/utils/BaseUrl";
import axios from "axios";
import { getSession } from "next-auth/react";

export const getAxiosHeaders = async () => {
  const session = await getSession();
  console.log("session-Client:::::::::", session?.accessToken);

  let headers = {};
  if (session?.accessToken) {
    headers = {
      Authorization: `Bearer ` + session.accessToken,
    };
  }

  return headers;
};

// Function to create the axios client with the session headers
export const axiosClient = async () => {
  const headers = await getAxiosHeaders(); // Await headers to be fetched

  console.log("headers:::",headers)
  return axios.create({
    baseURL: BaseUrl,
    headers: headers,
  });

};
