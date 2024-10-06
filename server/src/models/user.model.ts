import mongoose , {Schema , Document} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export interface IUser extends Document{
    firstName : string;
    lastName : string;
    username : string;
    email : string;
    phoneNumber : number;
    address : string;
    password : string;
    refreshToken : string;
    createdAt : Date;
    updatedAt : Date;
    generateAccessToken : Function,
    generateRefreshToken : Function,
    comparePassword : Function
};

const userSchema = new Schema<IUser>({
    firstName : {
        type : String,
        required : [true , "first name is required"]
    },
    lastName : {
        type : String,
        required : [true,"last name is required"]
    },

  

    email : {
        type : String,
        unique : true,
        lowercase : true,
        required : [true,"email is required"]
    },

    phoneNumber : {
        type  : Number,
        unique : true,
        required : [true,"Phone number is required"]
    },

    address : {
        type : String,
        required : [true,"address is required"]
    },

    password : {
        type : String,
        required : [true,"password is required"]
    },

    refreshToken : String
},
{
    timestamps : true
});

userSchema.pre<IUser>("save",async function (next){
    if (this.isModified("password")){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
    };
    next();
});

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY as string
        }
    )
};
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET as string,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY as string
        }
    )
};

userSchema.methods.comparePassword = async function(password : string):Promise<boolean>{
    return await bcrypt.compare(this.password,password);
};

export const User = mongoose.model<IUser>("User",userSchema);


