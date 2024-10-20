import { Request, Response } from "express";
import { generateAdminRefreshAndAccessToken } from "../../utilities/generateAdminRefreshAndAccessToken";
import { ErrorResponseBody, ResponseBody } from "../../constants/interfaces";
import { cookieOptions } from "../../constants/cookieOptions";
import { sendResponse } from "../../utilities";

interface AdminLoginRequestBody {
    password: string;
}

export const login = (req: Request, res: Response) => {
    try {
        const { password }: AdminLoginRequestBody = req.body;

        // Check if password is provided
        if (!password) {
            const responseBody: ResponseBody = {
                message: "Password is required",
                data: {}
            };
            return res.status(400).json(responseBody);
        }

        if (password !== (process.env.ADMIN_PASSWORD as string)) {
            const responseBody: ResponseBody = {
                message: "Password incorrect",
                data: {}
            };
            return res.status(400).json(responseBody);
        }

        const tokens = generateAdminRefreshAndAccessToken();

        if (!tokens) {
            
            return sendResponse(res , 500 , "An error occurred while creating tokens")
        }

        const responseBody: ResponseBody = {
            message: "Logged In",
            data: {
                tokens: tokens
            }
        };

        return res
            .status(200)
            .cookie("adminAccessToken", tokens.a_accessToken, cookieOptions)
            .cookie("adminRefreshToken", tokens.a_refreshToken, cookieOptions)
            .json(responseBody);
    } catch (error) {
        const errorResponseBody: ErrorResponseBody = {
            message: "An error occurred while logging in admin",
            errorMessage: (error as Error).message
        };
        return res.status(500).json(errorResponseBody); // Ensure you send the error response
    }
};
