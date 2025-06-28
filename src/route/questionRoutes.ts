import express from "express";
const router = express.Router()
import { getuestionList, saveQuestion, updateQuestion, deleteQuestion } from "../controllers/questionController";
import { createUpdateQuestionValidation, creatQeuestionSaveValidation, validate } from "../middleware/validationMiddleware";


router.get("/getQuestionList/:categoryId", getuestionList);
router.post("/saveQuestion", validate(creatQeuestionSaveValidation()), saveQuestion);
router.put("/updateQuestion/:questionId", validate(createUpdateQuestionValidation()), updateQuestion);
router.delete("/deleteQuestion/:questionId", deleteQuestion); 
export default router;  