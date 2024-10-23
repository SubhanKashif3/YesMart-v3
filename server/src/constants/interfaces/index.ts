import { IUser } from "../../models/user.model";
import { Request } from "express";


export interface RequestInterface extends Request {
    user?: IUser | null; // Make user optional in case it's not set
    isAdmin?: boolean; // Track if the user is an admin
}
