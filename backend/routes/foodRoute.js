import express from "express"
import { addFood, listAllFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();

//Image Storage Engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb) => {
        return cb(null, `${Date.now()}${file.originalname}`) //error handling
    }
})

const upload = multer({storage: storage})

foodRouter.get("/list", listAllFood)
foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.post("/remove", removeFood)
export default foodRouter;