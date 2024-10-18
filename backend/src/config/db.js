import mongoose from "mongoose";
import env from "../../src/env.js"

//try catch - used to catch errors. 
export const ConnectMongoDB = async()=>{
    try {
        mongoose.connect(env.MONGO_CONNECTION_STRING);
    } catch (error) {
        console.log(error)
    }
};

//If disconnected 

mongoose.connection.on('disconnected', ()=>{
    console.log('MongoDB Disconnected!')
})

mongoose.connection.on('connected', ()=>{
    console.log('MongoDB Connected Successfully!')
})