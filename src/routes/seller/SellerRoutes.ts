import express, { Router } from "express";


import multer from 'multer'
import { createRequest } from "../../controllers/seller/SellerRequestController";

const storage = multer.memoryStorage(); 
const upload = multer({ storage }); 
const sellerRequestRoutes: Router = express.Router()

sellerRequestRoutes.post('/create',upload.single('document'), createRequest)

export default sellerRequestRoutes