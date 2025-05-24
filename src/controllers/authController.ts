import User from "../models/User";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorResponse, sendSuccessResponse } from "../utils/helper/responseHelper";
import { asyncHandler } from "../middleware/asyncHandler";

/*
Need to define types of the params
*/

export const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new  ErrorResponse('Validation Error', 400, undefined,  errors.array()));
  }

  const { username, emailid, password, terms = true } = req.body;

  
  const userExists = await User.findOne({ emailid });
  if (userExists) {
    //add code to send the error details in response like other errors
    return next(new  ErrorResponse('User already exists', 400));
  }

  const user = await User.create({ username, emailid, password, terms});

  return sendSuccessResponse(res, 201, 'User registered successfully',user);
}) ;
