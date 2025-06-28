import express from "express";
const router = express.Router()
import { getCategoryList, saveCategory } from "../controllers/categoryController";
import { createSaveCategoryValidation, validate } from "../middleware/validationMiddleware";
//
router.get("/getCategoryList", getCategoryList);
router.get("/saveCategory",validate(createSaveCategoryValidation()),  saveCategory);

export default router;

