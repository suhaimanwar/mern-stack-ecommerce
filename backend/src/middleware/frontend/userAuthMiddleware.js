import env from "../../env.js";
import { unauthorizedError } from "../../utils/errorHandler.js";

import jwt from "jsonwebtoken";

export const userAuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    //requesting header from the dashboard
 
    console.log("req::::",req.headers)

    if (!authHeader) { 
      return next(unauthorizedError());
    }
     
    const token = authHeader.split(" ").at(1); //split the auth header - calling the index value
    const decodeData = jwt.verify(token, env.USER_JWT_SECRET_KEY); // jwt - verifying the token with the secret key we have stored.

    if (!decodeData) {
      return next(unauthorizedError());
    }

    req.user = decodeData; //decoded data - put into req.user

    next();
  } catch (error) {
    return next(unauthorizedError());
  }
};
