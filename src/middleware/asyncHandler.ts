import { Request, Response, NextFunction } from 'express';

/**
 * Async handler to avoid try-catch blocks in route handlers
 * @param fn Function to handle async operations
 */
export const asyncHandler = (fn: Function) => (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise.resolve(fn(req, res, next)).catch(next);