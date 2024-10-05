import express, {Application, Request, Response} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app : Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({
    limit : "15gb"
}));
app.use(express.urlencoded({extended : true}));

app.get("/",(req : Request , res : Response)=>{
    res.send(`
        <div>
        <h1>Hello</h1>
        </div>    
    
    
        `)
})

export default app;
