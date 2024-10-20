import { Request, Response } from "express";
import { ResponseBody, ErrorResponseBody } from "../../constants/interfaces";
import { IUser , User } from "../../models/user.model"; // Adjust the import based on your user model location
import { cookieOptions } from "../../constants/cookieOptions"; // Import your cookie options
import jwt from "jsonwebtoken"; // Ensure this is installed
import { sendResponse } from "../../utilities";

export const refreshAccessTokenByRefreshToken = async (req: Request, res: Response): Promise<Response> => {
    try {
        const refreshToken = req.cookies.refreshToken; // Get the refresh token from cookies

        if (!refreshToken) {
            return sendResponse(res , 401 , "Unauthorized request or refreshToken not available or expired");
        }

        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as IUser;

        if (!decoded) {
            return sendResponse(res , 400 , "Invalid Refresh Token")
        }

        // Find the user
        const user = await User.findById(decoded._id);
        if (!user) {
            return sendResponse(res , 400 , "User not found");
        }

        // Generate a new refresh token and access token
        const newRefreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();

        // Set the new refresh token in cookies using cookieOptions
        res.cookie('refreshToken', newRefreshToken, cookieOptions);

        // Return the new access token in the response
        const responseBody: ResponseBody = {
            message: "Access token refreshed successfully",
            data: {
                accessToken,
            }
        };

        return res.status(200).json(responseBody);

    } catch (error) {
        console.error("Error refreshing access token:", error); // Log the error for debugging
        const errorResponseBody: ErrorResponseBody = {
            message: "An error occurred while refreshing the access token",
            errorMessage : (error as Error).message
        };
        return res.status(500).json(errorResponseBody);
    }
};
