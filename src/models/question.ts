import mongoose, { Schema }from 'mongoose';
import { IQuestion } from '../types';

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    categoryId: {
      type: Number,
      required: true,
    },

    questionId: {
      type: Number,
      required: true,
      unique: true, // Ensure each question has a unique ID
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export default mongoose.model<IQuestion>('Question', questionSchema);

