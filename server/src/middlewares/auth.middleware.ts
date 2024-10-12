import { NextFunction, Request, Response } from "express";
import { ResponseBody } from "../constants/interfaces";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/user.model";
import { RequestInterface } from "../constants/interfaces";

export const isLoggedIn = async (req: RequestInterface, res: Response, next: NextFunction) => {
    try {
        const accessToken: string | undefined = req.cookies?.accessToken;
        const adminRefreshToken: string | undefined = req.cookies?.adminRefreshToken;

        // Check for the presence of an access token
        if (!accessToken) {
            const errorResponseBody: ResponseBody = {
                message: "Unauthorized request",
                data: {}
            };
            return res.status(401).json(errorResponseBody);
        }

        // Verify the access token
        let decodedToken: any;
        try {
            decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
        } catch (error) {
            const errorResponseBody: ResponseBody = {
                message: "Expired token or invalid token",
                data: {}
            };
            return res.status(401).json(errorResponseBody);
        }

        // Retrieve the user based on the decoded token's user ID
        const user: IUser | null = await User.findById(decodedToken._id);
        if (!user) {
            const errorResponseBody: ResponseBody = {
                message: "User not found",
                data: {}
            };
            return res.status(404).json(errorResponseBody);
        }

        // Check if the adminRefreshToken is present and set isAdmin accordingly
        req.isAdmin = !!adminRefreshToken; // Set to true if the token exists

        // Attach the user to the request object for further processing
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error in isLoggedIn middleware:", error);
        const errorResponseBody: ResponseBody = {
            message: "Internal server error",
            data: {}
        };
        return res.status(500).json(errorResponseBody);
    }
};
