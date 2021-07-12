/**
 * models/response.ts
 *
 * Set up the database response model
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
 interface Response {
    question: ObjectId //The ID of the question this answers to
     createdAt: Date;
     value: string
 }
 
// Note the type signature of the schema.
const ResponseSchema = new Schema<Response, Model<Response>>(
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
            type:Date,
            default: Date,
            // This calls the Date constructor every time a new model is created without this field value specified
        },
        expiresAt: {
            type: Date,
            required: false,
        },
        questions:[{
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
 
 
 
 