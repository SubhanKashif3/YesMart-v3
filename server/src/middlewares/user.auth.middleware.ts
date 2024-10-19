import { NextFunction, Response } from "express";
import { ResponseBody, RequestInterface } from "../constants/interfaces";
import jwt from "jsonwebtoken";
import { IUser, User } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const isNormalUser = async (req: RequestInterface, res: Response, next: NextFunction) => {
    try {
        console.log("Entering isNormalUser middleware");
        const accessToken: string | undefined = req.cookies?.accessToken;

        if (!accessToken) {
            console.log("No access token found");
            return sendErrorResponse(res, 401, "Unauthorized request");
        }
        
        let decodedToken: any;
        
        try {
            console.log("Attempting to verify access token");
            decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
            console.log("Access token verified");
        } catch (error) {
            console.error("Error verifying access token:", error);
            return sendErrorResponse(res, 401, "Expired token or invalid token");
        }
        
        const user: IUser | null = await User.findById(decodedToken._id);
        if (!user) {
            console.log("User not found");
            return sendErrorResponse(res, 404, "User not found");
        }
        
        req.user = user;
        console.log("User authenticated:", user._id);
        
        next();
    } catch (error) {
        console.error("Error in isNormalUser middleware:", error);
        return sendErrorResponse(res, 500, "Internal server error");
    }
};

const sendErrorResponse = (res: Response, status: number, message: string) => {
    const errorResponseBody: ResponseBody = {
        message,
        data: {}
    };
    return res.status(status).json(errorResponseBody);
};