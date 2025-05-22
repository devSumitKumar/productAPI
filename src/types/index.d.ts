export interface CustomError extends Error {
  statusCode?: number;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  stack?: string;
}

export interface SuccessResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  pagination?: {
    page: number;
    limit: number;
    totalPages: number;
    totalDocuments: number;
  };
}