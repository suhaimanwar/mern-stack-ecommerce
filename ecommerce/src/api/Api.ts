/* eslint-disable @typescript-eslint/no-explicit-any */
// import apiAxios from "./configs/axiosConfig"

import { axiosClient } from "./configs/axiosConfig";
import { axiosServer } from "./configs/axiosServer";

export const Api = { 
  getHomeCategories: async () => {
    const server = await axiosServer();
    const response = await server.get("home/categories");
    // console.log(response)
    return response.data.data;
  },
  getFeaturedProducts: async () => {
    const server = await axiosServer();
    const response = await server.get("home/featured");
    return response.data.data;
  },

  getAllCategories: async () => {
    const server = await axiosServer();
    const response = await server.get("shop/categories");

    // console.log(response)
    return response.data.data;
  },

  getProductbyCategory: async (id: string) => {
    const client = await axiosClient();
    const response = await client.get(`products/categories/${id}`);
    // console.log(response)
    return response.data.data;
  },

  getProductbyId: async (id: string) => {
    const client = await axiosClient();
    const response = await client.get(`products/view/${id}`);
    // console.log(response)
    return response.data.data;
  },

  createUser: async (body: any) => {
    const client = await axiosClient();
    const response = await client.post("user/create", body);
    // console.log("responseAPI::",response.data)
    return response.data;
  },

  loginUser: async (body: any) => {
    const server = await axiosServer();
    const response = await server.post("user/login", body);
    // console.log("responseAPI::",response.data)
    return response.data;
  },

  getAllBanners: async () => {
    const server = await axiosServer();
    const response = await server.get("home/banners");
    // console.log(response)
    return response.data.data;
  },

  orderCheckout: async (body: any) => {
    const client = await axiosClient();

    const response = await client.post("order", body);
    return response.data;
  },

  payment: async (id: string) => {
    const client = await axiosClient();
    const response = await client.get(`order?orderID=${id}`);
    return response.data;
  },
};
