import express, { Router } from "express";
import { createProduct ,getAllProducts} from "../controllers/ProductController";

const productRoutes: Router = express.Router()

productRoutes.post("/save",createProduct)
productRoutes.get("/all",getAllProducts)


export default productRoutes