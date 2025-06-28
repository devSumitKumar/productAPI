import mongoose, { Schema }from 'mongoose';

import { ICategory } from '../types';

const categorySchema = new Schema(
  {
    categoryType: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    categoryId: {
      type: Number,
      required: true,
      unique: true, // Ensure each category has a unique ID
    },
    createdBy: {
      type: String,
      ref: 'User', // assuming you have a User model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);
export default mongoose.model<ICategory>('Category', categorySchema);