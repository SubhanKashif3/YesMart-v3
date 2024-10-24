import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/user.model";
import { RequestInterface } from "../constants/interfaces";
import jwt from "jsonwebtoken";
import { ResponseStream, StatusCodes } from "json-response-sender";

interface DecodedToken {
    password: string;
    iat: number;
    exp: number;
}

export const isAdmin = async (
    req: RequestInterface,
    res: Response,
    next: NextFunction
) => {
    const response = new ResponseStream(res);
    
    try {
        const token = req.cookies?.adminAccessToken;
        console.log(token);
        
        if (!token) {
            console.log("No access Token found");
            return response.jsonResponseSender(
                StatusCodes.Unauthorized,
                "Unauthorized Request",
                {}
            );
        }
        
        const decodedToken = jwt.verify(
            token,
            process.env.ADMIN_ACCESS_TOKEN_SECRET as string
        ) as DecodedToken;
        
        console.log(decodedToken);
        
        // Check if the password in token matches admin password
        if (decodedToken.password !== process.env.ADMIN_PASSWORD) {
            return response.jsonResponseSender(
                StatusCodes.Forbidden,
                "Access Denied: Admin privileges required",
                {}
            );
        }
        
        // Set isAdmin flag on request object
        req.isAdmin = true;
        
        // If all checks pass, proceed to next middleware
        next();
        
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            // Handle specific JWT errors
            return response.jsonResponseSender(
                StatusCodes.Unauthorized,
                "Invalid or expired token",
                {}
            );
        }
        
        return response.jsonErrorResponseSender(
            StatusCodes.InternalServerError,
            "Something went wrong in isAdmin middleware",
            error as Error
        );
    }
};