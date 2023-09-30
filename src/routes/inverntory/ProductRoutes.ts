import express, { Router } from "express";
import { createProduct ,getAllProducts, getProductById} from "../../controllers/inverntory/ProductController";


import multer from 'multer'

const storage = multer.memoryStorage(); 
const upload = multer({ storage }); 

const productRoutes: Router = express.Router()

productRoutes.post("/save",upload.single('image'),createProduct)
productRoutes.get("/all",getAllProducts)
productRoutes.get("/:productId",getProductById)

export default productRoutes