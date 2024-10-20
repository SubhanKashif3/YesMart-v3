import { Response  } from "express";
import { ResponseBody } from "../constants/interfaces";
const sendResponse = (res: Response, status: number, message: string) => {
    const errorResponseBody: ResponseBody = {
        message,
        data: {}
    };
    return res.status(status).json(errorResponseBody);
};

export {sendResponse}