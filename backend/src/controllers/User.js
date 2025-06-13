import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Workout from "../models/Workout";

import ErrorHandler from "../utils/ErrorHandler";

export const UserRegister = async (req, res, next) => {
    const {name, email, password, image} = req.body;
    if(!name || !email || !password){
        return next(new ErrorHandler("All fields are required", 409));
    }

    const user = await User.findOne({email}).exec();
    if(user){
        return next(new ErrorHandler("User already exists", 409));
    }
}
