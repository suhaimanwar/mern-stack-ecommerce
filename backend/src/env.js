import * as dotenv from 'dotenv'
import { cleanEnv, port, str } from 'envalid';


dotenv.config();

const env = cleanEnv(process.env,{
    ENV: str({choices: ['local','production'], default:'local'}),
    PORT: port({default: 5000}),
    MONGO_CONNECTION_STRING: str({
        default: 'mongodb+srv://test_user:test_pass@cluster0.lkqvvrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    }),
})

export default env


//setting up env function