import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../models/inventory/Product";
import { Product } from "../../classes/inventory/Product";

import { UploadApiResponse } from "cloudinary";

import cloudinary from "../../services/CloudaryService";


/**
 * The function `generateProductCode` generates a random alphanumeric code of length 7.
 * @returns The function `generateProductCode` returns a randomly generated product code consisting of
 * alphanumeric characters.
 */
const generateProductCode = () => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const codeLength = 7 

  let code = '';

  for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
  }

  return code;
}


export const createProduct = async (req: Request, res: Response, next: NextFunction) => {

  const reqData: Product = JSON.parse(req.body['product'])
  const reqFile :Express.Multer.File = req.file

  if (!reqFile)
    return res.status(400).json({ error: 'No file provided.' });

  try {

    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) {
            console.error('Error uploading to Cloudinary:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(reqFile.buffer);
    });

    if (!result)
      return res.status(404).json({ error: 'File Saving on Cloud Failed!' })

    let data = {
      name: reqData.name,
      code: generateProductCode(),
      imageSrc: result.secure_url,
      price: reqData.price,
      quantity: reqData.quantity,
      rating: reqData.rating,
      category: reqData.category._id
    }

    const model = new ProductModel(data)

     await model.save();

    return res.status(201).json({ message: "Product Saved" });

  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ error: error.message })
  }
}



export const getAllProductsByPage = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const page: any = req.query.page || 1
    const itemsPerPage: any = req.query.itemsPerPage || 10
    const skipCount: number = (page - 1) * itemsPerPage;
    const products = await ProductModel.find({})
      .skip(skipCount)
      .limit(itemsPerPage);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


export const getAllProducts = async (req: Request, res: Response, _next: NextFunction) => {
  
  const products:Product[] = await ProductModel.find().populate('category')

  if(products)
    return res.status(201).json(products)

  return res.status(404).json({message:'No Product Found'})
}


export const getProductById = async (req: Request, res: Response, _next: NextFunction) => {

  const {productId} = req.params
  const product:Product = await ProductModel.findById(productId)

  if(product)
    return res.status(201).json(product)
  
  return res.status(404).json({error:"Product Not Found"})
}