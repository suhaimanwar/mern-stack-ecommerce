import { axiosClient } from "./config/axiosConfig";

export const bannerApi = {
  createBanner: async function (body: any) {
    // console.log('bodyyyyy',body)

    return await axiosClient.post(
      "banners/create", //Add the api route as per the brand router from the backend, it includes the port
      body, //Will include name, description, etc. etc.

      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },

  getAllBanners: async function () {
    return await axiosClient.get("banners/");
  },

  deleteBanner: async function (id: string) {
    return await axiosClient.delete(`banners/delete/${id}`);
  },

  getBannerbyId: async function (id: string) {
    return await axiosClient.get(`banners/view/${id}`);
  },

  updateBanner: async function (id:string ,body:any) {
        
    // console.log('updateeeeeee:::::',body)

    return await axiosClient.put(
        `banners/update/${id}`, //Add the api route as per the brand router from the backend, it includes the port
        body, //Will include name, description, etc. etc. 

        {
            headers:{
                "Content-Type": "multipart/form-data" //If image is present, We have to pass the content type as this,
            }
        }
    )
},
};
