import axios from "axios";
import { axiosClient } from "./config/axiosConfig";

export const categoryApi = {
  createCategory: async function (body: any) {
    console.log("bodyyyy::::", body);

    return await axiosClient.post(
      "categories/create",
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data", //Image type
        },
      },
    );
  },

  getAllCategory: async function () {
    return await axiosClient.get(
      "categories/",
      //While getting the data, We won't add any body here.
    );
  },

  deleteCategory: async function (id: string) {
    return await axiosClient.delete(
      `categories/delete/${id}`,
    );
  },

  getCategorybyId: async function (id: string) {
    return await axiosClient.get(`categories/view/${id}`);
  },

  updateCategory: async function (id: string, body: any) {
    // console.log("updateeeeeee:::::", body);

    return await axiosClient.put(
      `categories/update/${id}`, //Add the api route as per the brand router from the backend, it includes the port
      body, //Will include name, description, etc. etc.

      {
        headers: {
          "Content-Type": "multipart/form-data", //If image is present, We have to pass the content type as this,
        },
      },
    );
  },

};
