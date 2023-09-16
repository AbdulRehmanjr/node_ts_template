import { addCategory } from "../services/CategoryService"



export const createCategory = async  (req,res,_next)=>{
    console.log(req.body)
    // addCategory(req.body)
    // .then(response=> res.status(201).json(response))
    // .catch(error=> res.status(400).json(error))
  }

  