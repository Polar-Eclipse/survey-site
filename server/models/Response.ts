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
    {  question:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Question",
    },
    createdAt: {
        type: Date,
        required: false,
    },
    value:{
        type: String,
        required:true,
    },
    },
    {
        collection: "response",
        timestamps: true,
    },
);
 
// The mongoose model for the response
const Response = model("Response", ResponseSchema);
 
// This exports both the model and the interface
export default Response;