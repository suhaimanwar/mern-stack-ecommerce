import axios from "axios"

let headers = {}

if (typeof window !== "undefined"){
    headers = {
        Authorization: "bearer " + window.localStorage.getItem("accessToken") //setup header in axiosClient = getItem - we can get access token
    }
}

export const axiosClient = axios.create(
    {
        baseURL: 'http://localhost:5000/api/', //to setup baseUrl
        headers: headers
    }
)