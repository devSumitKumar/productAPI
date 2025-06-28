import category from "../models/category";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorResponse, sendSuccessResponse } from "../utils/helper/responseHelper";
import { asyncHandler } from "../middleware/asyncHandler";
import 'dotenv/config';
import { CategoryRequestType } from "../types";

const getLargestCategoryId = async () => {
    const largestCategoryId = await category.findOne().sort({ categoryId: -1 }).select('categoryId');
    const categoryIdValue = largestCategoryId ? largestCategoryId : 1000;
    const existingCategory = await category.findOne({ categoryIdValue });
    return existingCategory ? existingCategory.categoryId + 1 : 1000; // Default value if no categories exist

};

export const saveCategory = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ErrorResponse('Validation Error', 400, undefined, errors.array()));
        }
        const { categoryType, description, createdBy } = req.body as CategoryRequestType;

        if (!categoryType || typeof categoryType !== 'string') {
            return next(new ErrorResponse('Invalid category type', 400, undefined, [{ field: 'categoryType', message: 'Category type is required and must be a string' }]));
        }

        const largestCategoryId = await getLargestCategoryId();


        const existingCategory = await category.findOne({ categoryType });
        if (existingCategory) {
            return next(new ErrorResponse('Category already exists', 400, undefined, [{ field: 'categoryType', message: 'Category already exists' }]));
        }
        const newCategory = await category.create({ categoryType, description, categoryId: largestCategoryId, createdBy });
        return sendSuccessResponse(res, 201, 'Category saved successfully', newCategory);
    });

export const getCategoryList = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const categories = await category.find().select('categoryType categoryId');
        if (!categories || categories.length === 0) {
            return next(new ErrorResponse("No categories found", 404));
        }
        return sendSuccessResponse(res, 201, 'User registered successfully', categories);

    });