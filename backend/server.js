import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRouter.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRoute.js";

//app config 
const app = express()
const port = process.env.PORT || 4000;

//middleware 
app.use(express.json())
app.use(cors())

//db configuration
connectDB();

//api end points 
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads')) //serve static images(unchanged)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

//http request
app.get("/", (req, res) => {
    res.send("API is really now working")
})

app.listen(port, ()=> {
    console.log(`Server Started on Localhost:${port}`)
})

//mongodb+srv://Username:<db_password>@cluster0.mjud1.mongodb.net/?