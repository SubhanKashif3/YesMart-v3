import { Request, Response } from "express";
import { generateAdminRefreshAndAccessToken } from "../../utilities/generateAdminRefreshAndAccessToken";

import { cookieOptions } from "../../constants/cookieOptions";
import { ResponseStream, StatusCodes } from "json-response-sender";


interface AdminLoginRequestBody {
    password: string;
}

export const login = (req: Request, res: Response) => {
    const response = new ResponseStream(res);
    try {
        const { password }: AdminLoginRequestBody = req.body;

        // Check if password is provided
        if (!password) {
            return response.jsonResponseSender(StatusCodes.BadRequest,"Password is required",{});
        }

        if (password !== (process.env.ADMIN_PASSWORD as string)) {
            return response.jsonResponseSender(StatusCodes.BadRequest,"Password is incorrect",{});
        }

        const tokens = generateAdminRefreshAndAccessToken();

        if (!tokens) {
            
          return response.jsonResponseSender(StatusCodes.InternalServerError,"An error occured while creating tokens0",{})
        }


         res .cookie("adminAccessToken", tokens.a_accessToken, cookieOptions).cookie("adminRefreshToken", tokens.a_refreshToken, cookieOptions)
           
    

        return response.jsonResponseSender(StatusCodes.OK,"You are admin",{
            tokens: tokens,
            isAdmin : true
        })
    } catch (error) {
        return response.jsonErrorResponseSender(StatusCodes.InternalServerError,"Something went wrong while logging admin",(error as Error))
    }
};
