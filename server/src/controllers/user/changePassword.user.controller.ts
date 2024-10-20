import { Request, Response } from "express";
import { RequestInterface, ResponseBody, ErrorResponseBody } from "../../constants/interfaces";
import { IUser, User } from "../../models/user.model";
import { sendResponse } from "../../utilities";

interface ChangePasswordRequestBody {
    oldPassword: string;
    newPassword: string;
}

export const changePassword = async (req: RequestInterface, res: Response): Promise<Response> => {
    try {
        const { oldPassword, newPassword }: ChangePasswordRequestBody = req.body;
        const user: IUser | null | undefined = req.user;

        if (!user) {
            return sendResponse(res , 400 , "User not found");
        }

        // Check if the old password is correct
        const isOldPasswordCorrect = await user.comparePassword(oldPassword);

        if (!isOldPasswordCorrect) {
            return sendResponse(res , 400 , "Current password is incorrect")
        }

        // Update the user's password (the model should handle hashing)
        const updatedUser: IUser | null = await User.findByIdAndUpdate(
            user._id,
            { password: newPassword }, // Assuming the model handles hashing
            { new: true, runValidators: true }
        );

        // Return success response
        const responseBody: ResponseBody = {
            message: "Password changed successfully",
            data: {
                user: updatedUser // Be cautious about what user info you return
            }
        };

        return res.status(200).json(responseBody);
        
    } catch (error) {
        console.error("Error changing password:", error); // Log the error for debugging
        const errorResponseBody: ErrorResponseBody = {
            message: "An error occurred while changing the password",
            errorMessage : (error as Error).message
        };
        return res.status(500).json(errorResponseBody);
    }
};
