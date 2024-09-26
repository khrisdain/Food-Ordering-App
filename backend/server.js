import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

//app config 
const app = express()
const port = 4000;

//middleware 
app.use(express.json())
app.use(cors())

//db configuration
connectDB();

//api end points 
app.use("/api/food", foodRouter)

//http request
app.get("/", (req, res) => {
    res.send("API is really now working")
})

app.listen(port, ()=> {
    console.log(`Server Started on Localhost:${port}`)
})

//mongodb+srv://Username:<db_password>@cluster0.mjud1.mongodb.net/?