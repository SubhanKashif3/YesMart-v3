import {Schema , model , Document} from "mongoose";


export interface ICategory{
    categoryName : string;
};


const categorySchema = new Schema<ICategory>({
    categoryName : {
        type : String,
        enum : [
            "electronics",
            "cosmetics",
            "crockery",
            "frozenItems",
            "snacksAndDrinks",
            "undergarments",
            "selfCare",
            "others",
        ],
        required : [true,"Category name is required"]
    }
},{timestamps : true});


export const Category = model<ICategory>("Category",categorySchema);