import express, { Router } from "express";
import { createRole } from "../controllers/RoleController";


const roleRoutes: Router = express.Router()


roleRoutes.post('/save',createRole)

export default roleRoutes