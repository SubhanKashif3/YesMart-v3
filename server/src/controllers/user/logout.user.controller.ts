import { Response } from "express";
import { RequestInterface } from "../../constants/interfaces";
import { IUser } from "../../models/user.model";

export const logout = async (req: RequestInterface, res: Response) => {
    try {
        const user: IUser | undefined | null = req.user;
        const isAdmin: boolean | undefined = req.isAdmin;

        // Check if the user is logged in
        if (!user) {
            return res.status(400).json({
                message: "No user is currently logged in.",
                data: {}
            });
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

        return res.status(200).json({
            message: "Successfully logged out.",
            data: {}
        });
    } catch (error) {
        console.error("Error in logout function:", error);
        return res.status(500).json({
            message: "Internal server error",
            data: {}
        });
    }
};
