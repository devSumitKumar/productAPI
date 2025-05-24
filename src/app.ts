import express, { Application } from 'express';
import cors from 'cors';
import swaggerDocs from './swagger/swaggerDocs';

const app: Application = express();
import authRouter from './route/authRoutes';
import { errorHandler } from './middleware/errorMiddleware';
import path from 'path';
// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/user/auth', authRouter);
app.use('/swagger-output.json', cors(), express.static(path.join(__dirname, './swagger/swagger-output.json')));

// Swagger Documentation
swaggerDocs(app);
// Error Handler (Should be the last middleware)
app.use(errorHandler);

export default app;