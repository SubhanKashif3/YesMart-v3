import { Response } from "express";
import { RequestInterface } from "../../constants/interfaces";
import { ResponseStream, StatusCodes } from "json-response-sender";

import { IProduct, Product } from "../../models/product.model";
import { Company } from "../../models/company.model";
import { Category } from "../../models/category.model";

export interface AddProductsRequestBody {
  productName: string;
  productCompany: string;
  productCategory: string;
  productStockQuantity: number;
  productPrice: number;
  coverImage: string;
}

interface BulkAddRequestBody {
  products: AddProductsRequestBody[];
}

export const bulkAdd = async (req: RequestInterface, res: Response) => {
  const response = new ResponseStream(res);

  try {
    const { products }: BulkAddRequestBody = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return response.jsonResponseSender(
        StatusCodes.BadRequest,
        "Products array is required",
        {}
      );
    }

    // Extract company and category names from the incoming products
    const companyNames = [...new Set(products.map(item => item.productCompany))];
    const categoryNames = [...new Set(products.map(item => item.productCategory))];

    // Use aggregation pipelines to find or create companies and categories
    const companies = await Company.aggregate([
      { $match: { companyName: { $in: companyNames } } },
      { $project: { companyName: 1, _id: 1 } }
    ]);

    const categories = await Category.aggregate([
      { $match: { categoryName: { $in: categoryNames } } },
      { $project: { categoryName: 1, _id: 1 } }
    ]);

    // Create a map of company names to their corresponding company ids
    const companyMap = companies.reduce((map, company) => {
      map[company.companyName] = company._id;  // Store ObjectId, not companyName
      return map;
    }, {} as Record<string, mongoose.Types.ObjectId>);

    // Create a map of category names to their corresponding category ids
    const categoryMap = categories.reduce((map, category) => {
      map[category.categoryName] = category._id;  // Store ObjectId, not categoryName
      return map;
    }, {} as Record<string, mongoose.Types.ObjectId>);

    const productsToInsert = [];
    const failedProducts = [];

    // Process the products and prepare for insertion
    for (const item of products) {
      const companyId = companyMap[item.productCompany];
      const categoryId = categoryMap[item.productCategory];

      if (!companyId || !categoryId) {
        failedProducts.push({
          productName: item.productName,
          productCompany: item.productCompany,
          productCategory: item.productCategory,
          error: "Company or Category not found"
        });
        continue;  // Skip invalid products
      }

      const product = {
        productName: item.productName,
        productPrice: item.productPrice,
        productStockQuantity: item.productStockQuantity,
        productCategory: categoryId,  // This is now an ObjectId
        productCompany: companyId,    // This is now an ObjectId
        coverImage: item.coverImage
      };

      productsToInsert.push(product);
    }

    // Bulk insert products
    const result = await Product.insertMany(productsToInsert);

    // Now, populate the 'productCompany' and 'productCategory' fields
    const populatedProducts = await Product.find({ _id: { $in: result.map(product => product._id) } })
      .populate('productCompany', 'companyName isLocalVendor')  // Populate the Company reference
      .populate('productCategory', 'categoryName');  // Populate the Category reference

    // Prepare the response data
    const addedProductsCount = populatedProducts.length;

    return response.jsonResponseSender(StatusCodes.OK, "Products added successfully", {
      addedProductsCount,
      failedProducts,
      products: populatedProducts.map(product => ({
        productName: product.productName,
        productPrice: product.productPrice,
        productStockQuantity: product.productStockQuantity,
        coverImage: product.coverImage,
        productCompany: product.productCompany, // Now includes detailed company data
        productCategory: product.productCategory, // Now includes detailed category data
        productId: product._id
      }))
    });

  } catch (error) {
    return response.jsonErrorResponseSender(
      StatusCodes.InternalServerError,
      "Something went wrong while bulk adding products into db",
      error as Error
    );
  }
};
