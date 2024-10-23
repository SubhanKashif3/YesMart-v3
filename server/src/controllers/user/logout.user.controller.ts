import { Response } from "express";
import { RequestInterface } from "../../constants/interfaces";
import { IUser } from "../../models/user.model";
import { ResponseStream, StatusCodes } from "json-response-sender";


export const logout = async (req: RequestInterface, res: Response) => {
    const response = new ResponseStream(res);
    try {
        const user: IUser | undefined | null = req.user;
        const isAdmin: boolean | undefined = req.isAdmin;

        // Check if the user is logged in
        if (!user) {
            return response.jsonResponseSender(StatusCodes.BadRequest,"No user is currently logged in",{});
        }

        // If the user is an admin, we will logout both the user and admin
        if (isAdmin) {
            // Clear admin refresh token cookie
            res.clearCookie("adminRefreshToken");
        }

        // Clear access token cookie for both user and admin
        res.clearCookie("accessToken");

        // Optionally, you can also perform any additional cleanup here, 
        // like revoking tokens in your database if applicable.

        return response.jsonResponseSender(StatusCodes.OK,"Logged Out",{});
    } catch (error) {
        return response.jsonErrorResponseSender(StatusCodes.InternalServerError,"Something went wrong while logging out",(error as Error));
    }
};
