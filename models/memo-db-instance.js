import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const memoSchema = new Schema({
    memo: {
        type: String,
        require: true
    },
    isDone: {
        type: String,
        default: false
    },
    created: {
        type: Date,
        default: Date()
    },
    owener:{
        type: Schema.Types.ObjectId,
        ref: 'userModel'
    }
})

// const memoCollection = mongoose.model('memoModel', memoSchema, 'memoCollection');

export { memoSchema };