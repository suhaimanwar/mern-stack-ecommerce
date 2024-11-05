import { BaseUrl } from "@/utils/BaseUrl";
import axios from "axios";

const apiAxios = axios.create({
    baseURL: BaseUrl
})

export default apiAxios