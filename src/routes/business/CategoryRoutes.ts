import express, { Router } from "express";
import { createCategory, deleteCategory, getAllCategories } from "../../controllers/business/CategoryController";

import multer from 'multer'

const storage = multer.memoryStorage(); 
const upload = multer({ storage }); 
const categoryRoutes: Router = express.Router()

categoryRoutes.post('/save',upload.single('image'), createCategory)
categoryRoutes.get('/all',getAllCategories)
categoryRoutes.delete('/delete/:ids',deleteCategory)

export default categoryRoutes