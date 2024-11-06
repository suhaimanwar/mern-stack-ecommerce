import axios from "axios";

export const productApi = {
  createProduct: async function (body: any) {
    return await axios.post("http://localhost:5000/api/products/create", body, {
      headers: {
        "Content-Type": "multipart/form-data", //Image type
      },
    });
  },

  getAllProducts: async function () {
    return await axios.get("http://localhost:5000/api/products/");
  },

  deleteProduct: async function (id: string) {
    return await axios.delete(
      `http://localhost:5000/api/products/delete/${id}`,
    );
  },

  getProductbyId: async function (id: string) {
    return await axios.get(`http://localhost:5000/api/products/view/${id}`);
  },

  updateProduct: async function (id: string, body: any) {
    // console.log("updateeeeeee:::::", body);

    return await axios.put(
      `http://localhost:5000/api/products/update/${id}`, //Add the api route as per the brand router from the backend, it includes the port
      body, //Will include name, description, etc. etc.

      {
        headers: {
          "Content-Type": "multipart/form-data", //If image is present, We have to pass the content type as this,
        },
      },
    );
  },

  featuredProduct: async function (id: string) {
    return await axios.put(
      `http://localhost:5000/api/products/featured/${id}`,
    );
  },


};
