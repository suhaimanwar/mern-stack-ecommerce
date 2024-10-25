import axios from 'axios'

export const brandApi = {
    createBrand: async function (body:any) {
        
        console.log('bodyyyyy',body)

        return await axios.post(
            "http://localhost:5000/api/brands/create", //Add the api route as per the brand router from the backend, it includes the port
            body, //Will include name, description, etc. etc. 

            {
                headers:{
                    "Content-Type": "multipart/form-data" //If image is present, We have to pass the content type as this,
                }
            }
        )
    }
}