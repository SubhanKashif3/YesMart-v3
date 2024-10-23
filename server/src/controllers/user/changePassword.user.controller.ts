import { Request, Response } from "express";
import { RequestInterface } from "../../constants/interfaces";
import { IUser, User } from "../../models/user.model";
import { ResponseStream, StatusCodes } from "json-response-sender";

interface ChangePasswordRequestBody {
    oldPassword: string;
    newPassword: string;
}

export const changePassword = async (req: RequestInterface, res: Response): Promise<Response> => {
    const response = new ResponseStream(res);
    try {
        const { oldPassword, newPassword }: ChangePasswordRequestBody = req.body;
        const user: IUser | null | undefined = req.user;

        if (!user) {
            return response.jsonResponseSender(StatusCodes.NotFound,"User not found",
                {}
            )
        }

        // Check if the old password is correct
        const isOldPasswordCorrect = await user.comparePassword(oldPassword);

        if (!isOldPasswordCorrect) {
            return response.jsonResponseSender(StatusCodes.BadRequest,"Old password incorrect",{})
        }

        // Update the user's password (the model should handle hashing)
        const updatedUser: IUser | null = await User.findByIdAndUpdate(
            user._id,
            { password: newPassword }, // Assuming the model handles hashing
            { new: true, runValidators: true }
        );

        // Return success response
       

       return response.jsonResponseSender(StatusCodes.OK,"Password changed successfully",{
        user : updatedUser
       })
        
    } catch (error) {
        return response.jsonErrorResponseSender(StatusCodes.InternalServerError,"Something went wrong while changing user password",(error as Error))
    }
};
