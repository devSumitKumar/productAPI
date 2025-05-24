import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../utils/helper/responseHelper';
import { ValidationRule } from '../types';

// Validation helper functions
const isRequired = (value: any): string | null => 
  !value ? 'This field is required' : null;

const isEmail = (value: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailRegex.test(value) ? 'Invalid email format' : null;
};

const minLength = (length: number) => (value: string): string | null =>
  value.length < length ? `Must be at least ${length} characters` : null;

const maxLength = (length: number) => (value: string): string | null =>
  value.length > length ? `Must be less than ${length} characters` : null;

/**
 * Create validation rules for registration
 */
export const createRegisterValidation = ()  =>{
  return  [
  {
    field: 'username',
    validations: [
      isRequired,
      minLength(2),
      maxLength(50)
    ]
  },
  {
    field: 'emailid',
    validations: [
      isRequired,
      isEmail
    ]
  },
  {
    field: 'password',
    validations: [
      isRequired,
      minLength(6)
    ]
  }
] as ValidationRule[]
};
  
  

/**
 * Middleware to validate request
 */
export const validate = (rules: ValidationRule[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: { field: string; message: string }[] = [];

    rules.forEach(rule => {
      const value = req.body[rule.field];
      
      for (const validation of rule.validations) {
        const error = validation(value);
        if (error) {
          errors.push({ field: rule.field, message: error });
          break;
        }
      }
    });

    if (errors.length > 0) {
      //modify belwo code 

      return next(new  ErrorResponse('Validation Error', 400, undefined, errors));
    }

    next();
  };
};