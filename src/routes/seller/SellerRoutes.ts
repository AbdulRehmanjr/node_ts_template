import express, { Router } from "express";
import multer from 'multer';
import { createRequest, getAllRequests, getRequestByUserId } from "../../controllers/seller/SellerRequestController";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const sellerRequestRoutes: Router = express.Router();

sellerRequestRoutes.post('/create', upload.single('document'), createRequest)
sellerRequestRoutes.get('/all',getAllRequests)
sellerRequestRoutes.get('/user/:userId',getRequestByUserId)
export default sellerRequestRoutes;
