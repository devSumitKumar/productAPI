import express from "express";
const router = express.Router()
import {registerUser} from "../controllers/authController";
import { validate, createRegisterValidation } from "../middleware/validationMiddleware";

router.post("/registerUser",validate(createRegisterValidation()) , registerUser);

export default router;