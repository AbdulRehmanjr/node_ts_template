import express, { Router } from "express";
import { createCategory } from "../controllers/CategoryController";


const categoryRoutes: Router = express.Router()




categoryRoutes.post('/save', createCategory)



export default categoryRoutes