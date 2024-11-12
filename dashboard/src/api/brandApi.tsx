import axios from 'axios'
import { axiosClient } from './config/axiosConfig'

export const brandApi = {
    createBrand: async function (body:any) {
        
        // console.log('bodyyyyy',body) 

        return await axiosClient.post(
            "brands/create", //Add the api route as per the brand router from the backend, it includes the port
            body, //Will include name, description, etc. etc. 
            
            { 
                headers:{
                    "Content-Type": "multipart/form-data" //If image is present, We have to pass the content type as this,
                }
            }
        )
    },

    getAllBrands: async function () {
        
        return await axiosClient.get(
            "brands/", //Add the api route as per the brand router from the backend, it includes the port
            //While getting the data, We won't add any body here.
        )
    },


    deleteBrand: async function (id:string) {
        return await axiosClient.delete(`brands/delete/${id}`)
    },

    getBrandbyId: async function (id:string) {
        return await axiosClient.get(
            `brands/view/${id}`
        )
    },

    updateBrand: async function (id:string ,body:any) {
        
        console.log('updateeeeeee:::::',body)

        return await axiosClient.put(
            `brands/update/${id}`, //Add the api route as per the brand router from the backend, it includes the port
            body, //Will include name, description, etc. etc. 

            {
                headers:{
                    "Content-Type": "multipart/form-data" //If image is present, We have to pass the content type as this,
                }
            }
        )
    },
}