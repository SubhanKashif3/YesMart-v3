import { IUser } from "../../models/user.model";
import { Request } from "express";
export interface ResponseBody{
    message : string;
    data : Object | null
};

export interface ErrorResponseBody{
    message : string;
    errorMessage : string;
};


export interface RequestInterface extends Request {
    user?: IUser | null; // Make user optional in case it's not set
    isAdmin?: boolean; // Track if the user is an admin
}
