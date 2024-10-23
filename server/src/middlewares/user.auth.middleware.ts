import { NextFunction, Response } from "express";
import {  RequestInterface } from "../constants/interfaces";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/user.model";
import { ResponseStream, StatusCodes } from "json-response-sender";

export const isNormalUser = async (req: RequestInterface, res: Response, next: NextFunction) => {
    const response = new ResponseStream(res);
    try {
        console.log("Entering isNormalUser middleware");
        const accessToken: string | undefined = req.cookies?.accessToken;

        if (!accessToken) {
            console.log("No access token found");
            return response.jsonResponseSender(StatusCodes.Unauthorized,"Unauthorized Request",{});
        }   
        
        let decodedToken: any;
        
        try {
            console.log("Attempting to verify access token");
            decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
            console.log("Access token verified");
        } catch (error) {
            console.error("Error verifying access token:", error);
            return response.jsonResponseSender(StatusCodes.Unauthorized,"Expired or invalid token",{})
        }
        
        const user: IUser | null = await User.findById(decodedToken._id);
        if (!user) {
            console.log("User not found");
            return response.jsonResponseSender(StatusCodes.NotFound,"User not found",{})
        }
        
        req.user = user;
        console.log("User authenticated:", user._id);
        
        next();
    } catch (error ) {
        return response.jsonErrorResponseSender(StatusCodes.InternalServerError,"Something went wrong in isLoggedIn middleware",(error as Error));
        
    }
};

