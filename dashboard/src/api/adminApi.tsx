import axios from "axios";
import { axiosClient } from "./config/axiosConfig";

export const adminApi = {

  // loginAdmin: async function (body: any) {
  //   return await axios.post("http://localhost:5000/api/admin/login", body);
  // },
  loginAdmin: async function (body: any) {
    return await axiosClient.post("admin/login", body);
  },


  updatePassword: async function (body: any) {
    return await axiosClient.post("admin/update", body);
  },


};
