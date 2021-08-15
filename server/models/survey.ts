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

import { model, Document, Model, Schema, Types } from "mongoose";

/**
 * Base interface for all question data
 */
interface QuestionBase{
    question: string;
}

/**
 * Data for an MC type question
 */
export interface QuestionChoice extends QuestionBase{
    choices: string[];
}

/**
 * The base type for the survey model
 */
interface SurveyBaseType extends Document {
    title: string;
    activeFrom: Date;
    expiresAt?: Date;
    activeOverride?: boolean;
    createdAt: Date;
    updatedAt: Date;
    owner: Types.ObjectId;
}

/**
 * T/F type survey model
 */
export interface SurveyYesNoType extends SurveyBaseType {
    questions: string[];
    type: "yesno";
}

/**
 * MC type survey model
 */
export interface SurveyChoiceType extends SurveyBaseType {
    questions: QuestionChoice[];
    type: "choice";
}

/**
 * The survey model type which can be one of all available types
 */
type Survey = SurveyYesNoType | SurveyChoiceType;

/**
 * Mongoose document instance methods defined in the schema
 */
export interface SurveyMethods {
    /**
     * Check if this survey is active at the given time.
     *
     * If the time is not provided, it defaults to the current time.
     */
    isActive: (date?: Date) => boolean;
}

/**
 * The schema for the survey model
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const SurveyBaseSchema = new Schema<SurveyBaseType, Model<SurveyBaseType, {}, SurveyMethods>, SurveyBaseType>(
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
        timestamps: true, // Automatically creates and manages `createdAt` and `updatedAt` fields
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

/**
 * The mongoose model for the survey
 */
const Survey = model("Survey", SurveyBaseSchema);

// This exports both the model and the interface
export default Survey;

/**
 * Mongoose model for T/F type surveys
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const SurveyYesNo: Model<SurveyYesNoType, {}, SurveyMethods> = Survey.discriminator(
    "SurveyYesNo",
    new Schema({ questions: [String] }),
    "yesno",
);

/**
 * Mongoose model for MC type surveys
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const SurveyChoice: Model<SurveyChoiceType, {}, SurveyMethods> = Survey.discriminator(
    "SurveyChoice",
    new Schema({
        questions: [{
            question: {
                type: String,
                required: true,
            },
            choices: [String],
        }],
    }),
    "choice",
);
