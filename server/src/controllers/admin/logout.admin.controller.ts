import { Response } from "express";
import { RequestInterface } from "../../constants/interfaces";
import { cookieOptions } from "../../constants/cookieOptions";
import { ResponseStream, StatusCodes } from "json-response-sender";

export const logout = async (req : RequestInterface , res : Response) => {
    const response = new ResponseStream(res);
    try {
        res.clearCookie("adminAccessToken",cookieOptions).clearCookie("adminRefreshToken",cookieOptions);
        response.jsonResponseSender(StatusCodes.OK,"Logged out",{})
    } catch (error) {
        response.jsonErrorResponseSender(StatusCodes.InternalServerError , "Something went wrong in logout controller",error as Error);
        
    }
}