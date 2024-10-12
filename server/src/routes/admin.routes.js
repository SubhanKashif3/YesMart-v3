import { Router } from "express";
import { login } from "../controllers/admin";

const adminRouter = Router();

adminRouter.route("/login",login);


export {adminRouter};
