import { Request, Response } from "express";
import { RequestInterface, ResponseBody, ErrorResponseBody } from "../../constants/interfaces";
import { IUser, User } from "../../models/user.model";

interface ChangePasswordRequestBody {
    oldPassword: string;
    newPassword: string;
}

export const changePassword = async (req: RequestInterface, res: Response): Promise<Response> => {
    try {
        const { oldPassword, newPassword }: ChangePasswordRequestBody = req.body;
        const user: IUser | null | undefined = req.user;

        if (!user) {
            const errorResponseBody: ErrorResponseBody = {
                message: "User not found",
                data: {}
            };
            return res.status(404).json(errorResponseBody);
        }

        // Check if the old password is correct
        const isOldPasswordCorrect = await user.comparePassword(oldPassword);

        if (!isOldPasswordCorrect) {
            const errorResponseBody: ErrorResponseBody = {
                message: "Current password is incorrect",
                data: {}
            };
            return res.status(400).json(errorResponseBody);
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
            data: {}
        };
        return res.status(500).json(errorResponseBody);
    }
};
