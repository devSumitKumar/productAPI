import { ApiResponse } from "../../types";
import { Response } from "express";

export const sendErrorResponse = (message: string, statusCode: number = 500, data?: any): Error & { statusCode: number; data?: any } => {
  const error = new Error(message) as Error & { statusCode: number; data?: any };
  error.statusCode = statusCode;
  error.data = data;
  return error;
};

export class ErrorResponse extends Error {
  statusCode: number;
  data?: any;

  constructor(message: string, statusCode: number = 500, data?: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}


export const sendSuccessResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
): void => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data
  };
  res.status(statusCode).json(response);
};