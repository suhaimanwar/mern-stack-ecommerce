import env from "../../env.js";
import { unauthorizedError } from "../../utils/errorHandler.js";

import jwt from "jsonwebtoken";

export const adminAuthMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; 
    //requesting header from the dashboard

    // console.log("req::::",req.headers)

    if (!authHeader) {
      next(unauthorizedError());
      return;
    }

    const token = authHeader.split(" ").at(1); //split the auth header - calling the index value
    const decodeData = jwt.verify(token, env.ADMIN_JWT_SECRET_KEY); // jwt - verifying the token with the secret key we have stored.

    if (!decodeData) {
      next(unauthorizedError());
      return;
    }

    req.user = decodeData; //decoded data - put into req.user

    next();
  } catch (error) {
    next(unauthorizedError());
    return;
  }
};
