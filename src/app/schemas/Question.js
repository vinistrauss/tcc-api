import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema(
    {
        course: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Question', AnswerSchema);
