import { NextFunction, Request, Response } from "express"
import { CategoryModel } from "../models/Category"
import logger from "../Logger";
import cloudinary from '../services/CloudaryService'
import { Category } from "../classes/Category";

export const createCategory = async (req: Request, res: Response, _next: NextFunction) => {

  const { name } = req.body;
  const file = req.file

  if (!file)
    return res.status(400).json({ error: 'No file provided.' });

  try {

    const result: any = await new Promise((resolve, reject) => {
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

    const response = await model.save();
    logger.info("Category to database", response)

    return res.status(201).json({ message: "Category Saved" });

  } catch (error) {

    logger.error(`Error in saving category to database ${error.message}`)

    return res.status(404).json({ error: error.message })
  }
}

export const getAllCategories = async (_req: Request, res: Response, _next: NextFunction) => {

  const categories: Category[] = await CategoryModel.find()

  if (categories)
    return res.status(201).json(categories)

  return res.status(404).json({ error: "No Category Found" })
}

export const deleteCategory = async (req: Request, res: Response, _next: NextFunction) => {

  const Ids: string[] = req.params.ids.split(",")

  const result = await CategoryModel.deleteMany({ _id: { $in: Ids } })

  if(result)
    return res.status(201).json({message:"Category Deleted"})
  return res.status(404).json({error:"Some Thing went Wrong"})
}