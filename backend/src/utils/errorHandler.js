import { statusCode } from "../enum/StatusCodes.js";
import logger from "./logger.js";

export const customError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};

// we are passing status and message from the other page

export const notFoundError = (message = "Page Not Found") => {
  const err = new Error();
  err.status = statusCode.notFound;
  err.message = message;
  return err;
};

export const validationError = (message) => {
  const err = new Error();
  err.status = statusCode.validationError;
  err.message = message;
  return err;
};

export const userNotFoundError = (message) => {
  const err = new Error();
  err.status = statusCode.userNotFoundError;
  err.message = message;
  return err;
};

export const unauthorizedError = (message = "Unauthorized / Token Expired") => {
  const err = new Error();
  err.status = statusCode.unauthorized;
  err.message = message;
  return err;
};

export const serverError = (error, message = "Internal Server Error") => {
logger.error(message, error) // Will save into the logger file.
  const err = new Error();
  err.status = statusCode.serverError; //Will get the value from StatusCodes.js
  err.message = message;
  return err;
};
