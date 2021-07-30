/**
 * server/models/survey.ts
 *
 * Set up the database survey model
 *
 * Polar Survey
 * @author Aun Raza (301074590)
 * @author Jamee Kim (301058465)
 * @author Jerome Ching (300817930)
 * @author Sophie Xu (301098127)
 * @author Tien Sang Nguyen (301028223)
 * @author Eunju Jo (301170731)
 */

import { model, Model, Schema, Types } from "mongoose";

// Create an interface which TS can rely on to give us hints of what fields can be used.
interface Survey {
    questions: string[]
    title: string;
    activeFrom: Date;
    expiresAt?: Date;
    activeOverride?: boolean;
    createdAt: Date;
    updatedAt: Date;
    owner: Types.ObjectId;
    type: "yesno" ;
}

export interface SurveyMethods {
    /**
     * Check if this survey is active at the given time.
     *
     * If the time is not provided, it defaults to the current time.
     */
    isActive: (date?: Date) => boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
const SurveySchema = new Schema<Survey, Model<Survey, {}, SurveyMethods>, Survey>(
    {
        questions: [String],
        activeFrom: {
            type: Date,
            default: () => new Date(),
            // This calls the Date constructor every time a new model is created without this field value specified
        },
        title: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: false,
        },
        activeOverride: {
            type: Boolean,
            required: false,
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "User",
        },
        type: {
            type: String,
            default: "yesno",
        },
    },
    {
        collection: "surveys",
        timestamps: true,
        // Automatically creates and manages `createdAt` and `updatedAt` fields
    },
);

SurveySchema.methods.isActive = function (date?: Date): boolean {
    if (typeof this.activeOverride === "boolean") {
        return this.activeOverride;
    }
    const now = date || new Date();
    return this.activeFrom < now && (!this.expiresAt || now < this.expiresAt);
};

// The mongoose model for the survey
const Survey = model("Survey", SurveySchema);

// This exports both the model and the interface
export default Survey;
