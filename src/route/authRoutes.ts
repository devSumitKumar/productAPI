import express from "express";
const router = express.Router()
import {registerUser, loginUser} from "../controllers/authController";
import { validate, createRegisterValidation, createLoginValidation } from "../middleware/validationMiddleware";

router.post("/registerUser",validate(createRegisterValidation()) , registerUser);
router.post("/loginUser",validate(createLoginValidation()) , loginUser);

export default router;