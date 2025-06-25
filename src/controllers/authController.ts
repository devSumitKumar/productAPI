import User from "../models/User";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorResponse, sendSuccessResponse } from "../utils/helper/responseHelper";
import { asyncHandler } from "../middleware/asyncHandler";
import { loginUserReuestType, registerUserReuestType } from "../types";
import 'dotenv/config';
/*
Need to define types of the params
*/

export const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new  ErrorResponse('Validation Error', 400, undefined,  errors.array()));
  }

  const { username, emailid, password, terms = true, specialCode } = req.body as registerUserReuestType;


  const userExists = await User.findOne({ emailid });
  if (userExists) {
    //add code to send the error details in response like other errors
    return next(new  ErrorResponse('User already exists', 400, undefined, [{"field": "emailid", "message": "Email already registered"}]));
  }

  //check if userName is Admin and if so, set isAdmin to true
  const isAdminUser = specialCode === process.env.ADMIN_SPECIAL_CODE;
  const user = await User.create({ username, emailid, password, terms, isAdmin: isAdminUser });

  return sendSuccessResponse(res, 201, 'User registered successfully',user);
}) ;


export const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

 const errors = validationResult(req);

 if (!errors.isEmpty()) {
    return next(new  ErrorResponse('Validation Error', 400, undefined,  errors.array()));
  }

const { username, password } = req.body as loginUserReuestType;

const userDetails = await User.findOne({ username });

 if (!userDetails) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  //when user is exist match the password
  //we can directlly match password from the userDetails object
  if (!userDetails.password) {
    return next(new ErrorResponse('Password not set for this user', 400));
  }
  //we can use the matchPassword method defined in the User model to compare passwords
  const isMatch = await userDetails.matchPassword(password); 

   if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  return sendSuccessResponse(res, 201, 'User registered successfully',userDetails);


});