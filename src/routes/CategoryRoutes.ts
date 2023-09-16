import express, { Router } from "express";
import { createCategory, getAllCategories } from "../controllers/CategoryController";

import multer from 'multer'

const storage = multer.memoryStorage(); 
const upload = multer({ storage }); 
const categoryRoutes: Router = express.Router()

categoryRoutes.post('/save',upload.single('image'), createCategory)
categoryRoutes.get('/all',getAllCategories)


export default categoryRoutes