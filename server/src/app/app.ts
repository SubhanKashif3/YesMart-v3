import express, {Application, Request, Response} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter , adminRouter } from "../routes";


const app : Application = express();

app.use(cors({
    origin : [
        "http://localhost:5173",
    ],
    credentials : true
}));
app.use(cookieParser());
app.use(express.json({
    limit : "15gb"
}));
app.use(express.urlencoded({extended : true}));

app.use("/api/users/",userRouter);
app.use("/api/admin",adminRouter)
export default app;
