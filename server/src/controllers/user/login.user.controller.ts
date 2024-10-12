import { Request , Response} from "express"
import { IUser, User } from "../../models/user.model";
import {  ErrorResponseBody, RequestInterface, ResponseBody } from "../../constants/interfaces";
import { cookieOptions } from "../../constants/cookieOptions";

type PhoneNumberAndPassword = string | number

interface LoginRequestBody{
    emailOrPassword : PhoneNumberAndPassword;
    phoneNumber? : number;
    password :  string;

};

export const login = async (req : RequestInterface ,res : Response) => {
    try {
        const {
            emailOrPassword,
            password
        } : LoginRequestBody = req.body;

        
        let user : IUser | null;
        
        if (typeof(emailOrPassword) === "number"){
           user  =  await User.findOne({phoneNumber : emailOrPassword})
        }else{
            user = await User.findOne({email : emailOrPassword});
        };


        if (!user){
            const errorRequestBody : ResponseBody = {
                message : "User with this email not found",
                data : {}
            }
        };

        const isPasswordCorrect : boolean = user?.comparePassword(password);
        
        if (!isPasswordCorrect){
            const errorResponseBody : ResponseBody = {
                message : "Invalid Credentials...",
                data : {}
            }
        };

        const accessToken : string = user?.generateAccessToken();
        const refreshToken : string = user?.generateRefreshToken();

        const responseBody : ResponseBody = {
            message : "User logged in",
            data : {
                user,
                tokens : {
                    accessToken,
                    refreshToken
                }
            }
        };

        return res.status(200).cookie("accessToken",accessToken,cookieOptions).cookie("refreshToken",refreshToken,cookieOptions).json(responseBody);
    } catch (error) {
        const errorResponseBody : ErrorResponseBody = {
            message : "Something went wrong while logging in",
            errorMessage : (error as Error).message
        };

        return res.status(500).json(errorResponseBody);
    }
}