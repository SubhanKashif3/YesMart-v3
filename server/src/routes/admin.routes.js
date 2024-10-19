import { Router } from "express";
import { login } from "../controllers/admin";
import { getAdmin } from "../controllers/admin/getAdmin.admin.controller";


const adminRouter = Router();

adminRouter.post("/login",login);
adminRouter.post("/get",getAdmin);

export {adminRouter};
