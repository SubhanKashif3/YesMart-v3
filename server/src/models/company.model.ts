import {Schema , model , Document} from "mongoose";

export interface IProductCompany{
    companyName : string;
    isLocalVendor : boolean;
    companyDescription? : string;
    companyLogo? : string;
    rating : number;
};

const companySchema = new Schema<IProductCompany>({
    companyName : {
        type : String,
        unique : true,
        lowercase: true,
        required : [true,"Company name is required"]
    },
    isLocalVendor: {
        type : Boolean,
        required : [true,"isLocalVendor?"]
    },

    rating : {
        type : Number,
        min : 1,
        max : 5,
        default : 0
    },

    companyLogo : String,

},{timestamps : true});

export const Company = model<IProductCompany>("Company",companySchema);