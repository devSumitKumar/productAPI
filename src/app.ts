import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();
const userRouter = require("./route/signup");

// Middleware
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/signup', userRouter);

// Swagger Documentation


// Error Handler (Should be the last middleware)

export default app;