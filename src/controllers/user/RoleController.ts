import { saveRole } from "../../services/RoleService";
/**
 * The function `saveRole` saves a new role in the database and returns the response.
 * @param {string} roleName - The `roleName` parameter is a string that represents the name of the role
 * that needs to be saved in the database.
 * @returns the response from saving the new role in the database.
 */
export const createRole = async  (req,res,_next)=>{

  saveRole(req.body)
  .then(response=> res.status(201).json(response))
  .catch(error=> res.status(400).json(error))
}
