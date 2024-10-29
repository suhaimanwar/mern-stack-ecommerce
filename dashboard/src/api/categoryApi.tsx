import axios from "axios";

export const categoryApi = {
  createCategory: async function (body: any) {

    console.log('bodyyyy::::',body)

    
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
};
