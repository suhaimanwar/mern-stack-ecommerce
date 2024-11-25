import axios from "axios"
import Cookies from "js-cookie";
import { cookies } from "next/headers";

let headers = {}

// let headers;

if (typeof window !== "undefined") {
    const accessToken = Cookies.get("accessToken");
    
    headers = {
        authorization: "bearer " + accessToken
    };
}

export const axiosClient = axios.create(
    {
        baseURL: 'http://localhost:5000/api/', //to setup baseUrl
        headers: headers
    }
)
