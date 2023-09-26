import express, { Router } from "express";
import { createProduct ,getAllProducts, getProductById} from "../../controllers/inverntory/ProductController";

const productRoutes: Router = express.Router()

productRoutes.post("/save",createProduct)
productRoutes.get("/all",getAllProducts)
productRoutes.get("/:productId",getProductById)

export default productRoutes