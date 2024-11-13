import axios from "axios"

import Cookies from "js-cookie";

let headers = {}

// if (typeof window !== "undefined"){
//     const accessToken = window.localStorage.getItem("accessToken")
//     console.log("access::::",accessToken)
//     headers = {
//         authorization: "bearer " + accessToken  //setup header in axiosClient = getItem - we can get access token
//     }
// }



// let headers;
if (typeof window !== "undefined") {
    const accessToken = Cookies.get("accessToken") || "";
    console.log("accesstokennn:::::", accessToken); // Log the access token to the console
    
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