import {model, Model, ObjectId, Schema } from "mongoose";

// Create an interface which TS can rely on to give use hints of what fields can be used.
interface Survey {
    name: string;
    description: string;
    activeFrom: Date;
    expiresAt?: Date;
    questions: ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

// Note the type signature of the schema.
const SurveySchema = new Schema<Survey, Model<Survey>, Survey>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        activeFrom: {
            type: Date,
            default:Date, // This calls the Date constructor every time a new model is created without this field value specified
        },
        expiresAt: {
            type: Date,
            required: false,
        },
        questions: [{
            type: [Schema.Types.ObjectId], // An array of ObjectId's
        }],
    },
    {
        collection: "surveys",
        timestamps: true,
        // Automatically creates and manages `createdAt` and `updatedAt` fields
    },
);

// The mongoose model for the survey
const Survey = model("Survey", SurveySchema);

// This exports both the model and the interface
export default Survey;



