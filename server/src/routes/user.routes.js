import { Router } from "express";
import {changePassword, login, logout, register} from "../controllers/user"
import { isLoggedIn } from "../middlewares";
import { isNormalUser } from "../middlewares/user.auth.middleware";
const userRouter  = Router();

userRouter.post("/register",register)
userRouter.post("/login",login);
userRouter.post("/logout",isNormalUser,logout);
userRouter.post("/changePassword",isNormalUser,changePassword);
export { userRouter };                                                  
