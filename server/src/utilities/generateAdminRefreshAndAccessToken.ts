import jwt from "jsonwebtoken"
interface Tokens{
    a_accessToken : string;
    a_refreshToken : string
}
export const generateAdminRefreshAndAccessToken = (): Tokens | null => {
    try {
        const accessToken = jwt.sign(
            {
                password : process.env.ADMIN_PASSWORD as string
            },
            process.env.ADMIN_ACCESS_TOKEN_SECRET as string,
            {
                expiresIn : process.env.ADMIN_A_TOKEN_EXPIRY as string
            }
        );            
        const refreshToken = jwt.sign(
            {
                password : process.env.ADMIN_PASSWORD as string
            },
            process.env.ADMIN_REFRESH_TOKEN_SECRET as string,
            {
                expiresIn : process.env.ADMIN_R_TOKEN_EXPIRY as string
            }
        );   
        
        const tokens : Tokens = {
            a_accessToken : accessToken,
            a_refreshToken : refreshToken
        };

        return tokens;
    } catch (error) {
        return null;
    }
};

