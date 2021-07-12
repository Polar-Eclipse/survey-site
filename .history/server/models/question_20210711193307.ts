import { model, Model, ObjectId, Schema } from "mongoose";

interface Question {
    survey: ObjectId;
    question: string;
    required: boolean;
    type: "text" | "yesno" | "choice";
    options: { value: string; text: string; }[];
    createdAt: Date;
    updatedAt: Date;
}

const QuestionSchema = new Schema<Question, Model<Question>, Question>(
    {
        survey: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Survey",
            // This allows "populating", although we won't be using it much
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
        options: {
            type: [{
                value: {
                    type: String,
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                },
            }], // An array of objects of the given type
        },
    },
    {
        collection: "questions",
        timestamps: true,
    },
);

const Question = model("Question", QuestionSchema);

export default Question;





















