import { Request , Response} from "express"
import { IUser, User } from "../../models/user.model";
import { RequestInterface} from "../../constants/interfaces";
import { cookieOptions } from "../../constants/cookieOptions";
import { ResponseStream , StatusCodes} from "json-response-sender";
type PhoneNumberAndPassword = string | number

interface LoginRequestBody{
    emailOrPassword : PhoneNumberAndPassword;
    phoneNumber? : number;
    password :  string;

};

export const login = async (req : RequestInterface ,res : Response) => {
    const response = new ResponseStream(res);
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
           return response.jsonResponseSender(StatusCodes.NotFound,"User not found",{});
        };

        const isPasswordCorrect : boolean = user?.comparePassword(password);
        
        if (!isPasswordCorrect){
            return response.jsonResponseSender(StatusCodes.BadRequest,"Invalid Credentials",{})
        };

        const accessToken : string = user?.generateAccessToken();
        const refreshToken : string = user?.generateRefreshToken();

        

        res.cookie("accessToken",accessToken,cookieOptions).cookie("refreshToken",refreshToken,cookieOptions);

        return response.jsonResponseSender(StatusCodes.OK,"LoggedIn",
            {
                user,
                tokens : {
                    accessToken,
                    refreshToken
                }
            }
        )

    } catch (error) {
        return response.jsonErrorResponseSender(StatusCodes.InternalServerError,"Something went wrong while login in",(error as Error));
    }
}