import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes

// Swagger Documentation


// Error Handler (Should be the last middleware)

export default app;