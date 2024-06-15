import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty']
    },
    status: {
        type: String,
        enum: ["in-progress", "blocked"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

//pre middleware hook 
userSchema.pre("save", async function (next) {
    // console.log(this, "we will save the data");
    const user = this;

    //create hash password to save in DB 
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});


//post middleware hook 
userSchema.post("save", function (doc, next) {

    // create password as empty string after saved the data in DB
    doc.password = ''
    next();
});

export const User = model<TUser>('User', userSchema);