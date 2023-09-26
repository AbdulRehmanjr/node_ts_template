import { Request, Response, NextFunction } from "express";
import logger from "../../Logger";
import { CategoryModel } from "../../models/Category";
import cloudinary from "../../services/CloudaryService";
import { SellerRequest } from "../../classes/seller/SellerRequest";
import { SellerRequestModel } from "../../models/seller/SellerRequest";
import { UploadApiResponse } from "cloudinary";

 const createRequest = async (req: Request, res: Response, _next: NextFunction) => {
    console.log(req.body)
    const data:SellerRequest = JSON.parse(req.body['seller'])
    console.log('Data',data)
    const file = req.file
  
    if (!file)
      return res.status(400).json({ error: 'No file provided.' });
  
    try {
  
      const result:UploadApiResponse  = await new Promise((resolve, reject) => {
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
  

export {createRequest}