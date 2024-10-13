import { Router } from "express";
import { login } from "../controllers/admin";


const adminRouter = Router();

adminRouter.post("/login",login);


export {adminRouter};
