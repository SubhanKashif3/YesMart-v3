import { Router } from "express";
import {changePassword, login, logout, register} from "../controllers/user"
import { isLoggedIn } from "../middlewares";
const userRouter  = Router();

userRouter.post("/register",register)
userRouter.post("/login",login);
userRouter.post("/logout",isLoggedIn,logout);
userRouter.post("/changePassword",isLoggedIn,changePassword);
export { userRouter } ;                                                  
