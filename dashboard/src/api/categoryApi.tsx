import axios from "axios";

export const categoryApi = {
  createCategory: async function (body: any) {
    console.log("bodyyyy::::", body);

    return await axios.post(
      "http://localhost:5000/api/categories/create",
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data", //Image type
        },
      },
    );
  },

  getAllCategory: async function () {
    return await axios.get(
      "http://localhost:5000/api/categories/",
      //While getting the data, We won't add any body here.
    );
  },

  deleteCategory: async function (id: string) {
    return await axios.delete(
      `http://localhost:5000/api/categories/delete/${id}`,
    );
  },

  getCategorybyId: async function (id: string) {
    return await axios.get(`http://localhost:5000/api/categories/view/${id}`);
  },

  updateCategory: async function (id: string, body: any) {
    // console.log("updateeeeeee:::::", body);

    return await axios.put(
      `http://localhost:5000/api/categories/update/${id}`, //Add the api route as per the brand router from the backend, it includes the port
      body, //Will include name, description, etc. etc.

      {
        headers: {
          "Content-Type": "multipart/form-data", //If image is present, We have to pass the content type as this,
        },
      },
    );
  },

};
