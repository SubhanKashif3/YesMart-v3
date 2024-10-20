import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/user.model";
import { RequestInterface } from "../constants/interfaces";
import { sendErrorResponse, sendResponse } from "../utilities";
import jwt from "jsonwebtoken";
export const isAdmin = async  (req : RequestInterface , res : Response , next : NextFunction) => {
    try {
        const token   = req.cookies?.accessToken;
        console.log(token);

        if (!token){
            console.log("No access Token found");
            sendResponse(res , 401 , "Unauthorized Request")
        };

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string);
        
        console.log(decodedToken);
    } catch (error) {
        sendErrorResponse(res,"Something went wrong in isAdmin midddleware",(error as Error),500);
    }
}