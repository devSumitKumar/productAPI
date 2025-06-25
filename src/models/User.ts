import mongoose from 'mongoose';
import { IUser } from '../types';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
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

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};


export default mongoose.model<IUser>('User', userSchema);