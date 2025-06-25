const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    categoryType: {
      type: String,
      required: true,
      enum: ['Technical', 'HR', 'Behavioral', 'General'], // You can adjust categories
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User', // assuming you have a User model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Question', questionSchema);
