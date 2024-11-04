import { Response } from "express";
import { RequestInterface } from "../../constants/interfaces";
import { ResponseStream, StatusCodes } from "json-response-sender";

import { IProduct, Product } from "../../models/product.model";
export interface AddProductsRequestBody{
    productName : string;
    productCompany : string;
    productCategory : string;
    productStockQuantity : number;
    productPrice : number;
    coverImage : string;
}
interface BulkAddRequestBody{
    products : AddProductsRequestBody[]
}
export const bulkAdd = async (req : RequestInterface , res : Response) => {
    const response = new ResponseStream(res);
    try {
        const {products} : BulkAddRequestBody = req.body;
        
        if (!Array.isArray(products) || products.length === 0){
            return response.jsonResponseSender(StatusCodes.BadRequest,"Products is not an array",{});
        }
        const dbProducts : IProduct[] = [];
        products.map((item)=>{
            const product = new Product({
                productCategory : item.productCategory,
                productName : item.productName,
                productPrice : item.productPrice,
                productStockQuantity : item.productStockQuantity,
                productCompany : item.productCompany,
                coverImage : item.coverImage
            });
            dbProducts.push(product);
        });
        console.log(dbProducts);
        
      
        

    } catch (error) {
      return response.jsonErrorResponseSender(StatusCodes.InternalServerError,"Something went wrong while bulk adding products into db",error as Error)
    }
}