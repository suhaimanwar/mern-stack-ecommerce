import { AdminModel } from "../../models/AdminModel.js";
import { serverError } from "../../utils/errorHandler.js";

import jwt from 'jsonwebtoken' 

import bcrypt from "bcrypt";
import env from "../../env.js";

export const createAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existingAdmin = await AdminModel.findOne({});

    if (existingAdmin) {
      return res.status(200).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password, salt);

    await AdminModel.create({
      username: username,
      password: hash,
    });

    return res.status(200).json({
      // If the data is send as a response successfully, this message should be displayed.
      success: true,
      message: "Admin Created Successfully",
    });
  } catch (error) {
    return next(serverError(error));
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const findAdmin = await AdminModel.findOne({
      username: username,
    });

    if (!findAdmin) { 
      return res.status(422).json({
        success: false,
        message: "Cannot Find Admin",
      });
    }
    const passwordCheck = bcrypt.compareSync(password, findAdmin.password);

    if (!passwordCheck) {
      return res.status(422).json({
        success: false,
        message: "Login Failed",
      });
    }

    const accessToken = jwt.sign({adminId: findAdmin._id}, env.ADMIN_JWT_SECRET_KEY, {expiresIn: env.JWT_EXPIRES}); //Assigning Tokens, With Dynamic ID,Admin Secret Key, and the expiry date 
    const userData = {username: findAdmin.username, role: 'admin'} //assigning roles

    return res.status(200).json({
      success: true,
      accessToken: accessToken, //Call the accessToken with a key value
      message: "Login Successful",
      userData: userData //Call the userData - includes role - with a key value
    });
  } catch (error) {
    next(serverError(error));
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { username, currentpass, newpass, confirmpass } = req.body;

    const findAdmin = await AdminModel.findOne({
      username: username,
    });

    if (!findAdmin) {
      return res.status(422).json({
        success: false,
        message: "Cannot Find User",
      });
    }

    const passwordCheck = bcrypt.compareSync(currentpass, findAdmin.password);

    if (!passwordCheck) {
      return res.status(422).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    if(currentpass == newpass){
      return res.status(422).json({
        success: false,
        message: "Old and New Passwords cannot be the same.",
      });
    }

    if(newpass!=confirmpass){
      return res.status(422).json({
        success: false,
        message: "Passwords does not match.",
      });
    }

    const salt = bcrypt.genSaltSync(10);

    findAdmin.password = bcrypt.hashSync(newpass, salt);

    await findAdmin.save()

    return res.status(200).json({
        success: true,
        message: "Updated Successfully",
      });

  } catch (error) {
    return next(serverError(error));
  }
};
