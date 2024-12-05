import * as dotenv from "dotenv";
import { cleanEnv, port, str } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
  ENV: str({ choices: ["local", "production"], default: "local" }),
  PORT: port({ default: 5000 }),
  ADMIN_USERNAME: str({ default: "admin" }),
  ADMIN_PASSWORD: str({ default: "admin" }),
  MONGO_CONNECTION_STRING: str({
    default:
      "mongodb+srv://test_user:test_pass@cluster0.lkqvvrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  }),
  ADMIN_JWT_SECRET_KEY: str({
    default: "aDmiN.blaCkHat.lksadshfeoiwh", //Token Secret code for Admin - Give Random Codes
  }),
  USER_JWT_SECRET_KEY: str({
    default: "UsER.blaCkHat.sjhfslihfseihf", //Token for User - Give Random Codes
  }),
  JWT_EXPIRES: str({ default: "7 days" }),
  STRIPE_SECRET_KEY: str({
    default: 'sk_test_51QQQs0C1kUuLig01bjR9zG24e6PuOZjauMBlmFr0qYhtMfs2tXxJAR9ulebMnXsfiJ1QXu0hdf4nzW3f8QVTXJgC00caj98ATA'
  }),
  ENDPOINT_SECRET_KEY: str({
    default: 'whsec_GSXI41ohb3vMjnf9ByvmapB1iGcx5CGn'
  })
  //expiry date
});

export default env;

//setting up env function
