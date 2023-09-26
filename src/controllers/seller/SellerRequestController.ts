import { Request, Response, NextFunction } from "express";
import logger from "../../Logger";
import { CategoryModel } from "../../models/Category";
import cloudinary from "../../services/CloudaryService";
import { SellerRequest } from "../../classes/seller/SellerRequest";
import { SellerRequestModel } from "../../models/seller/SellerRequest";
import { UploadApiResponse } from "cloudinary";

/**
 * This function handles a request to create a seller request, which includes validating the request
 * data, uploading a file to Cloudinary, saving the request data to a database, and returning a
 * response.
 * @param {Request} req - The `req` parameter is the request object that contains information about the
 * incoming HTTP request, such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is the response object that is used to send the HTTP
 * response back to the client. It is an instance of the `Response` class, which provides methods for
 * setting the response status code, headers, and body.
 * @param {NextFunction} _next - The `_next` parameter is a function that represents the next
 * middleware function in the request-response cycle. It is used to pass control to the next middleware
 * function.
 * @returns The function `createRequest` returns a response with the appropriate status code and JSON
 * data. The possible return values are:
 */
const createRequest = async (req: Request, res: Response, _next: NextFunction) => {

  const data: SellerRequest = JSON.parse(req.body['seller'])
  const file = req.file

  if (!file)
    return res.status(400).json({ error: 'No file provided.' });
  //* validating  data
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (value === null || value === undefined) {
        return res.status(400).json({ error: `${key} cannot be null or undefined` });
      }
    }
  }

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

    data.document = result.secure_url

    const model = new SellerRequestModel(data)

    const response = await model.save();
    logger.info("seller request to database", response)

    return res.status(201).json({ message: "seller request Saved" });

  } catch (error) {

    logger.error(`Error in saving seller request to database ${error.message}`)

    return res.status(404).json({ error: error.message })
  }
}

const getAllRequests = async (_req: Request, res: Response, _next: NextFunction) => {

  const data:SellerRequest[] = await  SellerRequestModel.find()

  if(data)
    return res.status(201).json(data)
  return res.status(404).json({error:"No Request Found"})
}

export { createRequest, getAllRequests }