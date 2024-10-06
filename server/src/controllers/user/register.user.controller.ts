import { Request, response, Response } from "express"
import { IUser, User } from "../../models/user.model";
import { ResponseBody, ErrorResponseBody } from "../../constants/interfaces";
import { cookieOptions } from "../../constants/cookieOptions";

interface RegisterRequestBody {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    password: string;
    phoneNumber: number;
};

export const register = async (req: Request, res: Response) : Promise<Response> => {
    try {
        const { firstName, lastName, email, password, phoneNumber }: RegisterRequestBody = req.body;


        const existedUser = await User.findOne({
            $or: [{ email }, { phoneNumber }]
        });


        if (!existedUser) {

            const response: ResponseBody = {
                message: "User with this email or phoneNumber  already exists",
                data: null
            }
            return res.status(400).json(response)
        };


        const newUser : IUser = new User ({
            firstName,
            lastName,
            email,
            phoneNumber,
            password
        });

        await newUser.save();

        const responseBody : ResponseBody = {
            message : "User registered successfully",
            data : {
                user : newUser
            }
        };

        const accessToken : string = newUser.generateAccessToken()
        const refreshToken : string = newUser.generateRefreshToken();


        return res.status(201).cookie("accessToken",accessToken,cookieOptions).cookie("refreshToken",refreshToken,cookieOptions).json(responseBody)

    } catch (error ) {
        const errorResponseBody : ErrorResponseBody = {
            message : "Something went wrong while registering user",
            errorMessage : (error as Error).message
        };
        return res.status(500).json(errorResponseBody);
    }
};