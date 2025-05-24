import { Request, Response, NextFunction } from 'express';

import { ErrorResponse, sendErrorResponse } from '../utils/helper/responseHelper';

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let error = err instanceof ErrorResponse ? err : new ErrorResponse(err.message || 'Server Error');

  //add Log error for debugging
  console.log("middleware",err);

  // Handle mongoose errors
  if (err.name === 'ValidationError') {
     console.log("middleware 22");
    error =  new ErrorResponse('Validation Error', 400, Object.values(err.errors).map((e: any) => e.message));
  }

  if (err.code === 11000) {
    console.log("middleware 27");
    error = new ErrorResponse('Duplicate field value', 400);
  }

  // Send standardized error response
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    error: "test",
    data: error.data
  });
};