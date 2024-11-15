import { nextTick } from "process";

import bcrypt from "bcrypt"
import env from "../env.js";
import { AdminModel } from "../models/AdminModel.js";
import { serverError } from "./errorHandler.js";

export const createAdmin = async (req,res,next) => {
  try {
    const adminExist = await AdminModel.findOne({});
    if (adminExist) {
      return;
    }

    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(env.ADMIN_PASSWORD, salt);

    await AdminModel.create({
      username: env.ADMIN_USERNAME,
      password: hash,
    });
  
  } catch (error) {
    return next(serverError(error));
  }
};
