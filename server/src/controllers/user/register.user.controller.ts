import { Response } from "express";
import { IUser, User } from "../../models/user.model";
import {  RequestInterface } from "../../constants/interfaces";
import { cookieOptions } from "../../constants/cookieOptions";
import { ResponseStream, StatusCodes } from "json-response-sender";

interface RegisterRequestBody {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    password: string;
    phoneNumber: number;
}

export const register = async (req: RequestInterface, res: Response): Promise<Response> => {
    const response = new ResponseStream(res);
    try {
        const { firstName, lastName, email, password, phoneNumber }: RegisterRequestBody = req.body;

        const existedUser = await User.findOne({
            $or: [{ email }, { phoneNumber }]
        });

        if (existedUser) {
            return response.jsonResponseSender(StatusCodes.BadRequest,"User with this email or phone number already exists",{});
        }

        const newUser: IUser = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            password
        });

        await newUser.save();

        
        const accessToken: string = newUser.generateAccessToken();
        const refreshToken: string = newUser.generateRefreshToken();

        res.cookie("accessToken", accessToken, cookieOptions).cookie("refreshToken", refreshToken, cookieOptions);

        return response.jsonResponseSender(StatusCodes.Created,"Registered and logged in success",{
            user: newUser
        })

    } catch (error) {
        return response.jsonErrorResponseSender(StatusCodes.InternalServerError,"Something went wrong while registering user",(error as Error))
    }
};