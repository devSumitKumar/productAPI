import Questions from "../models/question";
import Category from "../models/category";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorResponse, sendSuccessResponse } from "../utils/helper/responseHelper";
import { asyncHandler } from "../middleware/asyncHandler";
import { saveQuestionReuestType } from "../types";
import 'dotenv/config';

const QUESTION_ID_START = 100000; // Default starting value for questionId

const getLargestQuestionId = async () => {
    const largestCategoryId = await Questions.findOne().sort({ categoryId: -1 }).select('categoryId');
    const categoryIdValue = largestCategoryId ? largestCategoryId : QUESTION_ID_START;
    const existingCategory = await Questions.findOne({ categoryIdValue });
    return existingCategory ? existingCategory.categoryId + 1 : QUESTION_ID_START; // Default value if no categories exist

};

export const getuestionList = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { categoryId } = req.params;
        //below validation is not working need to check
        if (!categoryId || isNaN(Number(categoryId))) {
            return next(new ErrorResponse("Invalid category ID", 400, undefined, [{ field: 'categoryId', message: 'Category ID must be a valid number' }]));

        }
        const existingCategory = await Category.find({ categoryId });
        if (!existingCategory || existingCategory.length === 0) {
            return next(new ErrorResponse("Category not found", 404, undefined, [{ field: 'categoryId', message: 'Category with this ID does not exist' }]));
        }
        const questionList = await Questions.find({ categoryId }).select('question answer categoryType categoryId questionId createdBy');
        if (!questionList || questionList.length === 0) {
            return next(new ErrorResponse("No questions found", 404));
        }
        return sendSuccessResponse(res, 200, 'Questions retrieved successfully', questionList);
    }
);


export const saveQuestion = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ErrorResponse('Validation Error', 400, undefined, errors.array()));
        }

        const { question, answer, categoryId } = req.body as saveQuestionReuestType;
        const largestQuestionId = await getLargestQuestionId();


        if (!question || typeof question !== 'string') {
            return next(new ErrorResponse('Invalid question', 400, undefined, [{ field: 'question', message: 'Question is required and must be a string' }]));
        }

        if (!answer || typeof answer !== 'string') {
            return next(new ErrorResponse('Invalid answer', 400, undefined, [{ field: 'answer', message: 'Answer is required and must be a string' }]));
        }

        const newQuestion = await Questions.create({
            question, answer, categoryId, questionId: largestQuestionId
        });

        return sendSuccessResponse(res, 201, 'Question saved successfully', newQuestion);
    }
);

export const updateQuestion = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        const { questionId } = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ErrorResponse('Validation Error', 400, undefined, errors.array()));
        }

        const answer = req.body;

        const existingQuestion = await Questions.findOne({ questionId });
        if (!existingQuestion) {
            return next(new ErrorResponse('Question not found', 404, undefined, [{ field: 'questionId', message: 'Question with this ID does not exist' }]));
        };

        //new: true will return the updated document
        //runValidators: true will ensure that the update operation respects the schema validation rules
        const updatedQuestion = await Questions.findOneAndUpdate(
            { questionId }, answer, { new: true, runValidators: true })


        if (!updatedQuestion) {
            return next(new ErrorResponse('Failed to update question', 500));
        }

        return sendSuccessResponse(res, 200, 'Question updated successfully', updatedQuestion);



    });

export const deleteQuestion = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { questionId } = req.params;
        try {
            const existingQuestion = await Questions.findOneAndDelete({ questionId });
            if (!existingQuestion) {
                return next(new ErrorResponse('Question not found', 404, undefined, [{ field: 'questionId', message: 'Question with this ID does not exist' }]));
            }
            return sendSuccessResponse(res, 200, 'Question deleted successfully', {});
        } catch (error) {
            return next(new ErrorResponse('Deletion failed', 400, undefined, [{ field: 'questionId', message: 'Question ID must be a valid number' }]));
        }

    }
);
