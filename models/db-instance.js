import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const userCollection = mongoose.model('userModel', userSchema, 'userCollection');

export default userCollection;