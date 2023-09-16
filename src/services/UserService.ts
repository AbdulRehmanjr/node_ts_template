import { RoleModel } from "../models/Role";
import { IUser, UserModel } from "../models/User";

import dotenv from 'dotenv'
import { findRoleId } from "./RoleService";
import logger from "../Logger";

dotenv.config()

export const saveUser = async (userData: any) => {

  const roleName = process.env.USER
  const roleId = await findRoleId(roleName)
  try {
    const user: IUser = new UserModel(userData);
    user.role = roleId
    const response = await user.save();
    logger.info(response)
    return response;
  } catch (error) {
    logger.error(error)
    throw error;
  }
}