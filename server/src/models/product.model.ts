import mongoose , {Schema , Document} from "mongoose";


export interface IProduct extends Document{
    productName : string;
    productCompany : mongoose.Schema.Types.ObjectId;
    productCategory : string;
    productStockQuantity : number;
    productPrice : number;
    coverImage : string;
    boughtTimes : number;
    reviews : mongoose.Schema.Types.ObjectId[],
};

const productSchema = new Schema<IProduct>({
    productName : {
        type : String,
        unique : true,
        required : [true,"product name is required"]
    },

    productCompany : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Company",
        required : [true,"Product Company is required"]
    },


    productPrice : {
        type : Number,
        required : [true,"product price is required"]
    },


    productCategory : {
        type : String,
        enum : [
            "electronics",
            "cosmetics",
            "crockery",
            "frozen-items",
            "snacks-and-drinks",
        ],
        required : [true,"product category is required"]
    },

    coverImage : {
        type : String,
        required : [true,"cover image is required"]
    },
    productStockQuantity : {
        type : Number,
        min : 0,
        required : [true,"product stock quantity is required"]
    },

    boughtTimes : {
        type : Number,
        default : 0
    },
    
    reviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Review", 
        }
    ],

  

});

export const Product = mongoose.model<IProduct>("Product",productSchema);