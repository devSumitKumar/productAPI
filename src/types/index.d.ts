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

export interface registerUserResponse extends Request {
  username: string;
  emailid: string;
  password: string;
  terms: boolean;
}


/**
 * Standard API response format
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
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