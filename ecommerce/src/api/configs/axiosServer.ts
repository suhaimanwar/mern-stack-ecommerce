import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { BaseUrl } from "@/utils/BaseUrl";
import axios from "axios";
import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/authOptions";

// Asynchronous function to get headers
export const getAxiosHeaders = async () => {
  const session = await getServerSession(authOptions);

  console.log("server-session::::::::", session?.accessToken);

  let headers = {};
  if (session?.accessToken) {
    headers = {
      Authorization: `Bearer ` + session!.accessToken,
    };
  }

  return headers;
};

// Function to create the axios client with the session headers
export const axiosServer = async () => {
  const headers = await getAxiosHeaders(); // Await headers to be fetched
  return axios.create({
    baseURL: BaseUrl,
    headers: headers,
  });
};
