/**
 * models/user.ts
 *
 * Set up the database user model
 *
 * Polar Survey
 * @author Aun Raza
 * @author Jamee Kim (301058465)
 * @author Jerome Ching
 * @author Sophie Xu
 * @author Tien Sang Nguyen
 * @author Eunju Jo
 */
import mongoose, { model, Document, PassportLocalModel,PassportLocalSchema, Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export type UserType = "admin" | "user";
type User = Express.User;
declare global
{
     interface User extends Document{
        _id: string,
        username: string,
        created:Date,
        updated:Date,
        emailAddress: string,
        contactNumber: string,
        password:string,
        type:UserType,
     }
    }
const UserSchema = new Schema<User, PassportLocalModel<User>,User>
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
    },
    type:{
        type:String,
        enum:["admin","user"],
        default:"user",
    }

},
{
    collection: "users",
    timestamps:{
        createdAt :"created",
        updatedAt : "updated",
    }
});
UserSchema.plugin(passportLocalMongoose);
const User=model<User>("User", UserSchema as PassportLocalSchema);
export default User;