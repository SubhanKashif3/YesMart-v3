import { Response } from "express";
import { RequestInterface, ResponseBody, ErrorResponseBody } from "../../constants/interfaces";

export const getAdmin = (req: RequestInterface, res: Response) => {
    try {
        console.log("Cookies received:", req.cookies); // Log all cookies
        console.log("adminAccessToken:", req.cookies.adminAccessToken); // Log the specific admin access token

        const isAdmin = req.isAdmin ?? false;
        console.log("isAdmin in getAdmin function:", isAdmin);
        
        const responseBody: ResponseBody = {
            message: isAdmin ? "Admin access confirmed!" : "User is not an admin",
            data: {
                isAdmin: isAdmin
            }
        };
        
        return res.status(200).json(responseBody);
    } catch (error) {
        console.error("Error in getAdmin function:", error);
        const errorResponseBody: ErrorResponseBody = {
            message: "An error occurred while getting admin status",
            errorMessage: (error as Error).message
        };
        return res.status(500).json(errorResponseBody);
    }
}