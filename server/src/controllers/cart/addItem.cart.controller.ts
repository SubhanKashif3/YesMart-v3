import { Request, Response } from "express";
import mongoose from "mongoose";


interface AddItemRequestBody{
    productId : mongoose.Schema.Types.ObjectId,
    quantity : number
}

export const addItem = async (req : Request , res : Response) => {
    try {
        const {productId , quantity} : AddItemRequestBody = req.body;

        

    } catch (error) {
        
    }
}