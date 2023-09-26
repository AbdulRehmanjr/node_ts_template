import express, { Router } from "express";
import { createRole } from "../../controllers/user/RoleController";


const roleRoutes: Router = express.Router()


roleRoutes.post('/save',createRole)

export default roleRoutes