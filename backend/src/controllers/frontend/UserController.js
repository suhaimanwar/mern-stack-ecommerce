import bcrypt from "bcrypt"
import { UserModel } from "../../models/UserModel.js";
import { serverError } from "../../utils/errorHandler.js";


export const createUser = async (req, res, next) => {
    try {
      const { username, email, password, confirmpass, } = req.body;
  
      const existingEmail = await UserModel.findOne({
        email: email,
      });
  
      if (existingEmail) {
        // console.log("ex:::::::",existingUser)
        return res.status(422).json({
          success: false,
          message: "Email already exists",
        });
      }

      if (password!==confirmpass) {
        return res.status(422).json({
            success: false,
            message: "The Passwords does not match",
          });
      }
  
      const salt = bcrypt.genSaltSync(10);
  
      const hash = bcrypt.hashSync(password, salt);
  
      await UserModel.create({
        username: username,
        email: email,
        password: hash,
      });
  
      return res.status(200).json({
        // If the data is send as a response successfully, this message should be displayed.
        success: true,
        message: "User Created Successfully",
      });

    } catch (error) {
      return next(serverError(error));
    }
  };

  export const loginUser = async (req, res, next) => {
    try {
      const { username, password } = req.body;
  
      const findUser = await UserModel.findOne({
        username: username,
      });
  
      if (!findUser) {
        return res.status(422).json({
          success: false,
          message: "Cannot Find User",
        });
      }
      const passwordCheck = bcrypt.compareSync(password, findUser.password);
  
      if (!passwordCheck) {
        return res.status(422).json({
          success: false,
          message: "Login Failed",
        }); 
      }
  
      return res.status(200).json({
        success: true,
        message: "Login Successful",
      });
    } catch (error) {
      next(serverError(error));
    }
  };