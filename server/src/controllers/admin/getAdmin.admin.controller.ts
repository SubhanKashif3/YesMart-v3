import { Response } from "express";
import { RequestInterface} from "../../constants/interfaces";
import { ResponseStream, StatusCodes } from "json-response-sender";

export const getAdmin = (req: RequestInterface, res: Response) => {
    const response = new ResponseStream(res);
    try {
        console.log("Cookies received:", req.cookies); // Log all cookies
        console.log("adminAccessToken:", req.cookies.adminAccessToken); // Log the specific admin access token

        const isAdmin = req.isAdmin;
        console.log("isAdmin in getAdmin function:", isAdmin);
        
        if (!isAdmin){
            return response.jsonResponseSender(StatusCodes.Unauthorized,"Not an admin",{})
        }

        return response.jsonResponseSender(StatusCodes.OK,"You are an admin",{})
        
        
    } catch (error) {
        return response.jsonErrorResponseSender(StatusCodes.InternalServerError,"Something went wrong while Getting admin status",(error as Error))
    }
}