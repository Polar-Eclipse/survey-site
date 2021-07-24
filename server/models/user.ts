/**
 * server/models/user.ts
 *
 * Set up the database user model
 *
 * Polar Survey
 * @author Aun Raza (301074590)
 * @author Jamee Kim (301058465)
 * @author Jerome Ching (300817930)
 * @author Sophie Xu (301098127)
 * @author Tien Sang Nguyen (301028223)
 * @author Eunju Jo (301170731)
 */

import { model, Document, PassportLocalSchema, Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export type UserType = "admin" | "user";

type User = Express.User;

declare global {
    // This part is to give useful type-hinting for `req.user` object in route handlers.
    // It "augments" the type of the `req.user` object, meaning that more things are added to an already declared type.
    // The original type for `Express.User` interface has no fields. We add more fields that we have.
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface User extends Document{
            _id: string,
            username: string,
            createdAt: Date,
            updatedAt: Date,
            emailAddress: string,
            contactNumber: string,
            type: UserType,
        }
    }
}

const UserSchema = new Schema<User>
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
    type:{
        type:String,
        enum:["admin","user"],
        default:"user",
    }
},
{
    collection: "users",
    timestamps: true,
});

// False-positive type error.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
UserSchema.plugin(passportLocalMongoose);

const User = model<User>("User", UserSchema as PassportLocalSchema);
export default User;
