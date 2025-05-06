import { log } from "console";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()



export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_DB_URI!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
            
        })

        connection.on("error" , (err) => {
            console.log("MongoDB connection failed with error" + err);
            process.exit();
            
        })
        
    } catch (error) {
        console.log("Something went wrong while connecting to the database");
        console.log(error);
        
        
    }
}