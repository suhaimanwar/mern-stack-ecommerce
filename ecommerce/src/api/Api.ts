import apiAxios from "./configs/axiosConfig"


export const Api = {
    getHomeCategories: async () => {
        const response = await apiAxios.get("home/categories");

        // console.log(response)
        return response.data.data
    },
    getFeaturedProducts: async () => {
        const response = await apiAxios.get("home/featured");
        // console.log(response)
        return response.data.data
    }, 

    getAllCategories: async () => {
        const response = await apiAxios.get("shop/categories");

        // console.log(response)
        return response.data.data
    },

    getProductbyCategory: async (id: string) => {
        const response = await apiAxios.get(`products/categories/${id}`);
        // console.log(response)
        return response.data.data
    },

    getProductbyId: async (id: string) => {
        const response = await apiAxios.get(`products/view/${id}`);
        // console.log(response) 
        return response.data.data
    },

  



}