import axios from "axios";
import { axiosClient } from "./config/axiosConfig";

export const productApi = {
  createProduct: async function (body: any) {
    return await axiosClient.post("products/create", body, {
      headers: {
        "Content-Type": "multipart/form-data", //Image type
      },
    });
  },

  getAllProducts: async function () {
    return await axiosClient.get("products/");
  },

  deleteProduct: async function (id: string) {
    return await axiosClient.delete(
      `products/delete/${id}`,
    );
  },

  getProductbyId: async function (id: string) {
    return await axiosClient.get(`products/view/${id}`);
  },

  updateProduct: async function (id: string, body: any) {
    // console.log("updateeeeeee:::::", body);

    return await axiosClient.put(
      `products/update/${id}`, //Add the api route as per the brand router from the backend, it includes the port
      body, //Will include name, description, etc. etc.

      {
        headers: {
          "Content-Type": "multipart/form-data", //If image is present, We have to pass the content type as this,
        },
      },
    );
  },

  featuredProduct: async function (id: string) {
    return await axiosClient.put(
      `products/featured/${id}`,
    );
  },


};
