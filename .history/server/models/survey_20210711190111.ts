import mongoose from "mongoose";
const Schema = mongoose.Schema; // Schema alias
const questionSchema = new Schema
({
    YourQuestion: String, 
    FirstChoice: String,
    SecondChoice: String,
    ThirdChoice: String,
    ForthChoice: String
},

{
    collection: "question"
});

const Model = mongoose.model("question",questionSchema);
export default Model;
