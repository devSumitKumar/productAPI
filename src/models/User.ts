import mongoose, { Schema }from 'mongoose';
import { IUser } from '../types';
import bcrypt from 'bcryptjs';


const userSchema : Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    emailid: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    terms: {
        type: Boolean,
    },
    isAdmin: {
        type: Boolean,
    },
}, { timestamps: true });

//encrypt password before saving to database using bcrypt
  userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};


export default mongoose.model<IUser>('User', userSchema);