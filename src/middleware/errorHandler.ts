import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../types';


export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = err.statusCode || 500;
  
  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
  }
  
  // Handle Mongoose duplicate key errors
  if (err.name === 'MongoError' && (err as any).code === 11000) {
    statusCode = 400;
    err.message = 'Duplicate field value entered';
  }
  
  // Handle Mongoose bad ObjectId
  if (err.name === 'CastError') {
    statusCode = 404;
    err.message = `Resource not found with id of ${(err as any).value}`;
  }
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};