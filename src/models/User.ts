import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    terms: boolean;
};

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

}, { timestamps: true })


export default mongoose.model<IUser>('User', userSchema);