/**
 * models/survey.ts
 *
 * Set up the database survey model
 *
 * Polar Survey
 * @author Aun Raza
 * @author Jamee Kim (301058465)
 * @author Jerome Ching
 * @author Sophie Xu
 * @author Tien Sang Nguyen
 * @author Eunju Jo
 */


import {model, Model, ObjectId, Schema } from "mongoose";

// Create an interface which TS can rely on to give use hints of what fields can be used.
interface Survey {
    title: string;
    description?: string;
    activeFrom: Date;
    expiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    owner: ObjectId;
    type: "text" | "yesno" | "choice";
    options?: QuestionOptionItem[];


}
export interface QuestionOptionItem {
    value: string;
    text: string;
    }
// Note the type signature of the schema.
const SurveySchema = new Schema<Survey, Model<Survey>>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        activeFrom: {
            type:Date,
            default: Date,
            // This calls the Date constructor every time a new model is created without this field value specified
        },
        createAt: {
            type: Date,
            required: false,
        },
        expiresAt: {
            type: Date,
            required: false,
        },
        owner:{
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Owner",
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
                }
            }]
        },
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



