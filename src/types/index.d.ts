import { Document }from 'mongoose';

export interface CustomError extends Error {
  statusCode?: number;

}

export interface registerUserReuestType {
  username: string;
  emailid: string;
  password: string;
  terms: boolean;
  specialCode: string;
}

export interface loginUserReuestType {
  username: string;
  password: string;
}

export interface CategoryRequestType {
  categoryType: string; 
  description?: string;
  createdBy: string; // Assuming createdBy is a user ID
  }
/**
 * Standard API response format
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string | null | undefined;
  data?: T;
  error?: string;
}

interface ValidationRule {
  field: string;
  validations: ((value: any) => string | null)[];
}


export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    terms: boolean;
    isAdmin: boolean;
     matchPassword: (enteredPassword: string) => Promise<boolean>;
};

export interface IQuestion extends Document {
    question: string;
    answer: string;
    categoryType: string;
    categoryId: number;  
    questionId: number;
    createdBy: string; // Assuming createdBy is a user ID
};

export interface ICategory extends Document {
    categoryType: string;
    description: string;
    categoryId: number;
    createdBy: string; // Assuming createdBy is a user ID
};