import { NextFunction, Request, Response } from "express"
import { CategoryModel } from "../../models/Category"
import logger from "../../Logger";
import cloudinary from '../../services/CloudaryService'
import { Category } from "../../classes/Category";
import { UploadApiResponse } from "cloudinary";

/**
 * This TypeScript function creates a category by uploading an image to Cloudinary and saving the
 * category details to a database.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made to the
 * server. It contains information such as the request headers, request body, request method, and
 * request URL.
 * @param {Response} res - The `res` parameter is the response object that is used to send the HTTP
 * response back to the client. It contains methods and properties that allow you to set the response
 * status, headers, and body. In this code, it is used to send the success or error response back to
 * the client.
 * @param {NextFunction} _next - The `_next` parameter is a function that represents the next
 * middleware function in the request-response cycle. It is used to pass control to the next middleware
 * function.
 * @returns a JSON response with a status code and a message. If the file is not provided, it returns a
 * 400 status code with an error message. If the file saving on Cloudinary fails, it returns a 404
 * status code with an error message. If the category is successfully saved to the database, it returns
 * a 201 status code with a success message. If there is
 */
export const createCategory = async (req: Request, res: Response, _next: NextFunction) => {

  const { name } = req.body;
  const file = req.file

  if (!file)
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
      ).end(req.file.buffer);
    });

    if (!result)
      return res.status(404).json({ error: 'File Saving on Cloud Failed!' })

    let category = {
      name: name,
      image: result.secure_url
    }

    const model = new CategoryModel(category);

     await model.save();

    return res.status(201).json({ message: "Category Saved" });

  } catch (error) {

    logger.error(`Error in saving category to database ${error.message}`)

    return res.status(404).json({ error: error.message })
  }
}

/**
 * The function getAllCategories retrieves all categories from the database and returns them as a JSON
 * response.
 * @param {Request} _req - The `_req` parameter is of type `Request` and represents the incoming HTTP
 * request object.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to control the response, such
 * as setting the status code, sending JSON data, or redirecting the client to another URL.
 * @param {NextFunction} _next - The `_next` parameter is a function that represents the next
 * middleware function in the request-response cycle. It is used to pass control to the next middleware
 * function.
 * @returns a response with a status code and a JSON object. If categories are found, it will return a
 * response with a status code of 201 and the categories array as the JSON data. If no categories are
 * found, it will return a response with a status code of 404 and a JSON object with an error message.
 */
export const getAllCategories = async (_req: Request, res: Response, _next: NextFunction) => {

  const categories: Category[] = await CategoryModel.find()

  if (categories)
    return res.status(201).json(categories)

  return res.status(404).json({ error: "No Category Found" })
}

/**
 * The function `deleteCategory` deletes multiple categories from the database based on the provided
 * IDs.
 * @param {Request} req - The `req` parameter is an object that represents the HTTP request made by the
 * client. It contains information such as the request headers, request body, request method, request
 * URL, etc.
 * @param {Response} res - The `res` parameter is the response object that is used to send the response
 * back to the client. It contains methods and properties that allow you to set the status code,
 * headers, and send the response body.
 * @param {NextFunction} _next - The `_next` parameter is a function that represents the next
 * middleware function in the request-response cycle. It is used to pass control to the next middleware
 * function.
 * @returns a response object with a status code and a JSON message. If the deletion is successful, it
 * will return a 201 status code with a message "Category Deleted". If there is an error or the
 * deletion is not successful, it will return a 404 status code with an error message "Some Thing went
 * Wrong".
 */
export const deleteCategory = async (req: Request, res: Response, _next: NextFunction) => {

  const Ids: string[] = req.params.ids.split(",")

  const result = await CategoryModel.deleteMany({ _id: { $in: Ids } })

  if(result)
    return res.status(201).json({message:"Category Deleted"})
  return res.status(404).json({error:"Some Thing went Wrong"})
}