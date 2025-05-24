import express, { Application } from 'express';
import cors from 'cors';
const app: Application = express();
import authRouter from './route/authRoutes';
import { errorHandler } from './middleware/errorMiddleware';

// Middleware
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/user/auth', authRouter);

// Swagger Documentation


// Error Handler (Should be the last middleware)
app.use(errorHandler);

export default app;