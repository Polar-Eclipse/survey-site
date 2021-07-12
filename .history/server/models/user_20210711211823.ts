import mongoose, { PassportLocalSchema } from "mongoose";
const Schema = mongoose.Schema; // Schema alias
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new Schema
({
    username: {
        type:String,
        require:true,
    },
    emailAddress: {
        type:String,
        require:true,
    },
    contactNumber:{
        type:String,
        require:true,
    },
    
    password:{
        type:String,
        require:true,
    },

    created: {
        type: Date,
        default: Date.now(),
    },
    updated:
    {
        type: Date,
        default: Date.now()
    }
},
{
    collection: "user"
});

UserSchema.plugin(passportLocalMongoose);

const Model = mongoose.model("user", UserSchema as PassportLocalSchema);

declare global
{
    export type UserDocument = mongoose.Document &
    {
        _id: string,
        username: string,
        emailAddress: string,
        contactNumber: string,
        password:string
    }
}
export default Model;