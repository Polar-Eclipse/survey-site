/**
 * models/survey.ts
 *
 * Set up the database survey model
 *
 * Polar Survey
 * @author Aun Raza (301074590)
 * @author Jamee Kim (301058465)
 * @author Jerome Ching (300817930)
 * @author Sophie Xu (3010981127)
 * @author Tien Sang Nguyen (301028223)
 * @author Eunju Jo (301170731)
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
const SurveySchema = new Schema<Survey, Model<Survey>, Survey>(
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
            type: Date,
            default: () => new Date(),
            // This calls the Date constructor every time a new model is created without this field value specified
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
