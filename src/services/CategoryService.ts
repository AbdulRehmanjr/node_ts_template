import { CategoryModel } from "../models/Category"
import logger from "../Logger";

export const addCategory = async (category: Category) => {

    try {
        const model = new CategoryModel(category);

        const response = await model.save();
        logger.info("Category to database",response)
        return response;
    } catch (error) {
        logger.error("Error in saving category to database ",error)
        throw error;
    }
}