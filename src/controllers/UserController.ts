import { validationResult } from "express-validator";
import { UserModel } from "../models/User"
import { saveUser } from "../services/UserService";
// import * as jwt from 'jsonwebtoken'
// import dotenv from 'dotenv';
// dotenv.config();


/**
 * The function creates a user by validating the request, saving the user, and returning the response.
 * @param res - The `res` parameter is the response object that is used to send the HTTP response back
 * to the client. It contains methods and properties that allow you to set the response status,
 * headers, and body.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes details such as the request method, headers, URL, and body.
 * @returns a JSON response with an error message if there are validation errors, or a JSON response
 * with the saved user data if the user is successfully saved.
 */
export const createUser = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty())
    return res.status(404).json({ error: result.array() })

  saveUser(req.body)
    .then(response => res.status(201).json(response))
    .catch(error => res.status(404).json({ error: `${error.message}` }))
}
