import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try{
        if(!req.headers.authorization){
            return next(new ErrorHandler("user not authenticated", 401));
        }

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err){
                return next(new ErrorHandler("user not authenticated", 401));
            }
            req.user = user;
            next();
        })
    }catch(err){
       return next(new ErrorHandler(err.message, 500));
    }
};