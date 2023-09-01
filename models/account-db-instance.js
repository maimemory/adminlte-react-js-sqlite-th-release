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
    },
    record: [{
        memo: {
            type: String,
            require: true
        },
        isDone: {
            type: Boolean,
            default: false
        },
        created: {
            type: Date,
            default: Date()
        },
    }] 
})

const userCollection = mongoose.model('userModel', userSchema, 'userCollection');

export default userCollection;