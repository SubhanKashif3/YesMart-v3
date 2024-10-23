import { Request, Response } from "express";

import { IUser , User } from "../../models/user.model"; // Adjust the import based on your user model location
import { cookieOptions } from "../../constants/cookieOptions"; // Import your cookie options
import jwt from "jsonwebtoken"; // Ensure this is installed
import { ResponseStream, StatusCodes } from "json-response-sender";


export const refreshAccessTokenByRefreshToken = async (req: Request, res: Response): Promise<Response> => {
    const response = new ResponseStream(res);
    try {
        const refreshToken = req.cookies.refreshToken; // Get the refresh token from cookies

        if (!refreshToken) {
            return response.jsonResponseSender(StatusCodes.Unauthorized,"No access tooken found",{})
        }

        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as IUser;

        if (!decoded) {
            return response.jsonResponseSender(StatusCodes.BadRequest,"Invalid or expired token",{});
        }

        // Find the user
        const user = await User.findById(decoded._id);
        if (!user) {
            return response.jsonResponseSender(StatusCodes.NotFound,"User not found",{});
        }

        // Generate a new refresh token and access token
        const newRefreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();

        // Set the new refresh token in cookies using cookieOptions
        res.cookie('refreshToken', newRefreshToken, cookieOptions);

        // Return the new access token in the response
        

        return response.jsonResponseSender(StatusCodes.OK,"Access Token Refreshed Successfully",{
            accessToken
        })

    } catch (error) {
        return response.jsonResponseSender(StatusCodes.InternalServerError,"Something went wrong while refreshing access token",(error as Error));
    }
};
