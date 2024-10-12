import { Router } from "express";
import {login, logout, register} from "../controllers/user"
const userRouter  = Router();

userRouter.post("/register",register)
userRouter.post("/login",login);
userRouter.post("/logout",logout);
export { userRouter } ;                                                  
