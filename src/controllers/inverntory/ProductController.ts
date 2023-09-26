import { NextFunction, Request, Response } from "express";
import { ProductModel } from "../../models/Product";
import { Product } from "../../classes/Product";
import logger from "../../Logger";


/**
 * This function creates a new product by extracting the name, image source, and price from the request
 * body, creating a new product object, saving it to the database using a model, and returning a
 * response indicating success or failure.
 * @param {Request} req - The `req` parameter is the request object that contains information about the
 * incoming HTTP request, such as the request headers, request body, and request parameters.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, headers, and sending the response body.
 * @param {NextFunction} _next - The `_next` parameter is a function that represents the next
 * middleware function in the request-response cycle. It is used to pass control to the next middleware
 * function.
 * @returns If the response is successful, a JSON object containing the response is returned with a
 * status code of 201. If there is an error, a JSON object with an error message is returned with a
 * status code of 404.
 */
export const createProduct = async (req: Request, res: Response, _next: NextFunction) => {

  const { name, imageSrc, price } = req.body
  const product = {
    name: name,
    imageSrc: imageSrc,
    price: price
  }

  const model = new ProductModel(product);
  const response = await model.save();
  if (response)
    return res.status(201).json({ response });
  return res.status(404).json({ error: "Error" })
}


/**
 * The above function retrieves all products from the database and returns them as a response.
 * @param {Request} _req - The `_req` parameter is of type `Request`, which represents the HTTP request
 * received by the server. It contains information such as the request method, headers, query
 * parameters, and body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @param {NextFunction} _next - The `_next` parameter is a function that represents the next
 * middleware function in the request-response cycle. It is used to pass control to the next middleware
 * function.
 * @returns a JSON response with the products found in the database if there are any, along with a
 * status code of 201 (success). If there are no products found, it returns a JSON response with an
 * error message and a status code of 404 (not found).
 */
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
  
  const products:Product[] = await ProductModel.find()

  if(products)
    return res.status(201).json(products)
  return res.status(404).json({message:'No Product Found'})
}


/**
 * The function `getProductById` is an asynchronous function that retrieves a product by its ID and
 * returns it as a JSON response, or returns an error if the product is not found.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request headers, request body, request method, request
 * URL, and request parameters.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @param {NextFunction} _next - The `_next` parameter is a function that represents the next
 * middleware function in the request-response cycle. It is used to pass control to the next middleware
 * function.
 * @returns a JSON response with the product details if the product is found. If the product is not
 * found, it returns a JSON response with an error message stating "Product Not Found".
 */
export const getProductById = async (req: Request, res: Response, _next: NextFunction) => {

  const {productId} = req.params
  const product:Product = await ProductModel.findById(productId)

  if(product)
    return res.status(201).json(product)
  
  return res.status(404).json({error:"Product Not Found"})
}