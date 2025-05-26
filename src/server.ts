import 'dotenv/config'; // Use this to load environment variables from .env file
import app from './app';

import connectDB from './config/connectDB';

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  console.log(`📝 API Documentation available at http://localhost:${PORT}/api-docs`);
});