import cors from 'cors'
import express from 'express'
import { ConnectMongoDB } from './src/config/db.js';


const port = 5000;

//Run the express function in app
const app = express()

//App should use express in .json format and cors

app.use(express.json())
app.use(cors())

ConnectMongoDB();

// App should listen to the port. 

app.listen(port, async ()=>{
    console.log(`Server is listening to port ${port}`)
})

//Run it - npm run dev
//It should show the server is running

app.get("/test/api", async()=> {
    console.log("Hello Server : GET Method")
})

app.post("/test/api", async()=> {
    console.log("Hello Server : POST Method")
})