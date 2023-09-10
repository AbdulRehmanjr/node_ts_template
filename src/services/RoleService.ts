import { RoleModel } from "../models/Role";


/**
 * The function saves a new role in the database and returns the response.
 * @param {string} roleName - The `roleName` parameter is a string that represents the name of the role
 * that needs to be saved in the database.
 * @returns the response from saving the new role in the database.
 */
export const saveRole = async (roleName: string) => {

    try {
        const role = new RoleModel(roleName);
        const response = await role.save();
        console.log(`Saving new role in database ${response}`)
        return response;
    } catch (error) {
        console.error(`Error in saving role ${error.message}`)
        throw error;
    }
}

/**
 * The function `findRole` is an asynchronous function that fetches a role based on the provided role
 * name and returns it.
 * @param {string} roleName - The `roleName` parameter is a string that represents the name of the role
 * you want to find.
 * @returns the role object that is found in the database.
 */
export const findRoleId = async (roleName:string )=> {
    console.log(`Fetching role with ${roleName}`)
    try {
        const role = await RoleModel.findOne({authority:roleName})
        return role._id
    } catch (error) {
        console.error(`No Role Found : ${error.message}`)
        throw error
    }
}