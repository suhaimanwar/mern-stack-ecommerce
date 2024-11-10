import axios from "axios";

export const adminApi = {

  loginAdmin: async function (body: any) {
    return await axios.post("http://localhost:5000/api/admin/login", body);
  },


  updatePassword: async function (body: any) {
    return await axios.post("http://localhost:5000/api/admin/update", body);
  },


};
