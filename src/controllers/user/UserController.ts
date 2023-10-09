import { validationResult } from "express-validator";
import { UserModel } from "../../models/User"
import { saveUser } from "../../services/UserService";
import { NextFunction, Request, Response } from "express";
import logger from "../../Logger";
import { findRoleId } from "../../services/RoleService";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "../../services/CloudaryService";
import { IUser } from "../../classes/user/User";
import { RoleModel } from "../../models/Role";
// import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();



export const createUser = async (req: Request, res: Response, _next: Function) => {

  try {
  const reqData: IUser = JSON.parse(req.body['user'])
  const reqFile: Express.Multer.File = req.file


  if (!reqFile) {
    logger.error('No file Provided.')
    return res.status(400).json({ error: 'No file provided.' });
  }

  

    const roleName = process.env.USER
    const role = await RoleModel.findOne({ authority: roleName })

    if (!role) {
      logger.error('Role not Found')
      return res.status(404).json({ error: 'Role not Found' })
    }

    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) {
            console.error('Error uploading to Cloudinary:', error);
            reject(error);
          } else {
            logger.info("Image Saved")
            resolve(result);
          }
        }
      ).end(reqFile.buffer);
    })

    if (!result) {
      logger.error('File Saving error')
      return res.status(404).json({ error: 'File Saving on Cloud Failed!' })
    }

    let data = {
      firstName: reqData.firstName,
      lastName: reqData.lastName,
      profile: result.secure_url,
      email: reqData.email,
      password: reqData.password,
      role: role._id
    }

    const user = new UserModel(data)
    await user.save()

    logger.info('User saved')

    return res.status(201).json({ message: 'User Saved' });

  } catch (error) {
    logger.error(error.message)
    return res.status(501).json({ error: error.message })
  }

}


export const getUserInfo = async (req: Request, res: Response, _next: NextFunction) => {
  const userId = req['user']
  const user = await UserModel.findById(userId).populate('role').select("-password")
  if (!user)
    return res.status(404).json({ error: `No User Found ${userId}` })
  return res.status(201).json(user)
}