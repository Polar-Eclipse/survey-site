/**
 * server/models/response.ts
 *
 * Set up the database response model
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

 // Create an interface which TS can rely on to give use hints of what fields can be used.
 interface Response {
    question: Types.ObjectId; // The ID of the question this answers to
    title: string,
    answers: string[];
    createdAt: Date;
}

// Note the type signature of the schema.
const ResponseSchema = new Schema<Response, Model<Response>>(
    {
        question:{
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Question",
        },
        answers:[String],
        title: String
    },
    {
        collection: "response",
        timestamps: {
            createdAt: true,
            updatedAt: false,
        },
    },
);

// The mongoose model for the response
const Response = model("Response", ResponseSchema);

// This exports both the model and the interface
export default Response;
