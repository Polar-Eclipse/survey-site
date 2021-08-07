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
// add QuestionBase interface and export it
interface QuestionBase{
    question: string;
}

export interface QuestionChoice extends QuestionBase{
    choices: string[];
}

// Create an interface which TS can rely on to give us hints of what fields can be used.
interface SurveyBase {
    title: string;
    activeFrom: Date;
    expiresAt?: Date;
    activeOverride?: boolean;
    createdAt: Date;
    updatedAt: Date;
    owner: Types.ObjectId;
}

// add interface SurveyYesNO
interface SurveyYesNo extends SurveyBase {
    questions: string[];
    type: "yesno";
}

// add interface SurveyChoice
interface SurveyChoice extends SurveyBase {
    questions: QuestionChoice[];
    type: "choice";
}

// export type Survey
export type SurveyType = SurveyYesNo | SurveyChoice;
export interface SurveyMethods {
    /**
     * Check if this survey is active at the given time.
     *
     * If the time is not provided, it defaults to the current time.
     */
    isActive: (date?: Date) => boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
const SurveyBaseSchema = new Schema<SurveyBase, Model<SurveyBase, {}, SurveyMethods>, SurveyBase>(
    {

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
    },
    {
        collection: "surveys",
        timestamps: true,
        // Automatically creates and manages `createdAt` and `updatedAt` fields
        discriminatorKey: "type",
    },
);

SurveyBaseSchema.methods.isActive = function (date?: Date): boolean {
    if (typeof this.activeOverride === "boolean") {
        return this.activeOverride;
    }
    const now = date || new Date();
    return this.activeFrom < now && (!this.expiresAt || now < this.expiresAt);
};

// The mongoose model for the survey
const Survey = model("Survey", SurveyBaseSchema);

// This exports both the model and the interface
export default Survey;

//this method shows error that  type 'SurveyYesNo' does not satisfy the constraint 'Document<any, any, any>'.
/* const SurveyYesNo = Survey.discriminator<SurveyYesNo, Model<SurveyYesNo, {}, SurveyMethods>>(
    "SurveyYesNo",
    new Schema({ questions: [String] }),
    "yesno"
);

export SurveyYesNo; */

export const SurveyYesNo = Survey.discriminator("yesno", new Schema({ questions: [String] }));
export const SurveyChoice = Survey.discriminator("choice", new Schema({ questions: [{ choices: [String] }] }));
