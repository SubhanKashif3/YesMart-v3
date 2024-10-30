import { Router } from "express";
import { login , getAdmin} from "../controllers/admin"
import { isAdmin } from "../middlewares";
import { logout } from "../controllers/admin/logout.admin.controller";


const adminRouter = Router();

adminRouter.post("/login",login);
adminRouter.post("/get",isAdmin,getAdmin);
adminRouter.post("/logout",isAdmin,logout)

export {adminRouter};
