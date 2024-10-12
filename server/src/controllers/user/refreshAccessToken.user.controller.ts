import { Request, Response } from "express";
import { ResponseBody, ErrorResponseBody } from "../../constants/interfaces";
import { IUser , User } from "../../models/user.model"; // Adjust the import based on your user model location
import { cookieOptions } from "../../constants/cookieOptions"; // Import your cookie options
import jwt from "jsonwebtoken"; // Ensure this is installed

export const refreshAccessTokenByRefreshToken = async (req: Request, res: Response): Promise<Response> => {
    try {
        const refreshToken = req.cookies.refreshToken; // Get the refresh token from cookies

        if (!refreshToken) {
            const errorResponseBody: ResponseBody = {
                message: "Refresh token not found",
                data: {}
            };
            return res.status(401).json(errorResponseBody);
        }

        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as IUser;

        if (!decoded) {
            const errorResponseBody: ResponseBody = {
                message: "Invalid refresh token",
                data: {}
            };
            return res.status(401).json(errorResponseBody);
        }

        // Find the user
        const user = await User.findById(decoded._id);
        if (!user) {
            const errorResponseBody: ResponseBody = {
                message: "User not found",
                data: {}
            };
            return res.status(404).json(errorResponseBody);
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
