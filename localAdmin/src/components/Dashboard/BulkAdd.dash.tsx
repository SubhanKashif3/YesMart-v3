
import { ApiResponse } from "@/interfaces/ApiResponses";
import { apiClient } from "@/utilities/apiClient";
import { useState } from "react";

interface Products {
  productName: string;
  productCompany: string;
  productCategory: string;
  productStockQuantity: number;
  productPrice: number;
  coverImage: string;
}

const BulkAdd = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [apiResponse , setApiResponse] = useState<ApiResponse>();
 
  const sendProducts = async () => {
    const response = await apiClient.post("/products/bulkAdd",{products});
    setApiResponse(apiResponse);
  };

  // const uploadPhotoToCloudinary = async () => {
  //   // Logic for uploading a photo to Cloudinary
  // };

  return (
    <>
      
    </>
  );
}

export default BulkAdd;
