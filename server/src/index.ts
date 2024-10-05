import dotenv from "dotenv";
import app from "./app/app";
import connectToMongoDbDatabase from "./database/connectToDatabase";

dotenv.config({
    path : "./.env"
});

connectToMongoDbDatabase().then(()=>{
    console.log("Mongo DB connected");
    app.listen(process.env.PORT,()=>{
        console.log("App running on 8080")
    })
})