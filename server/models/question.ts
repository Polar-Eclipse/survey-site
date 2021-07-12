import { model, Model, ObjectId, Schema } from "mongoose";

interface Question {
    survey: ObjectId;
    question: string;
    required: boolean;
    type: "text" | "yesno" | "choice";
    options: QuestionOptionsValue[];
    createdAt: Date;
    updatedAt: Date;
}

export interface QuestionOptionsValue {
    value: string;
    text: string;
}

const QuestionSchema = new Schema<Question, Model<Question>, Question>(
    {
        survey: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Survey",
        },
        question: {
            type: String,
            required: true,
        },
        required: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            enum: ["text", "yesno", "choice"], // Only one of these values
            default: "text",
        },
        options: [{
            value: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
        }], // An array of QuestionOptionsValue
    },
    {
        collection: "questions",
        timestamps: true,
    },
);

const Question = model("Question", QuestionSchema);

export default Question;
