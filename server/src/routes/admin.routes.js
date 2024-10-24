import { Router } from "express";
import { login } from "../controllers/admin";
import { getAdmin } from "../controllers/admin/getAdmin.admin.controller";
import { isAdmin } from "../middlewares";


const adminRouter = Router();

adminRouter.post("/login",login);
adminRouter.post("/get",isAdmin,getAdmin);

export {adminRouter};
