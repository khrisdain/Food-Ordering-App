import userModel from "../models/userModel.js"

const addToCart = async(req, res) => {
    try{
        let userData = await userModel.findOne({ _id: req.body.userId})
        let cartData = await userData.cartData;

        //check if cartData object is empty
        if (!cartData[req.body.userId]) {
            cartData[req.body.userId] = 1;8
        }
        else{
            cartData[req.body.userId] += 1;
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const removeFromCart = async(req, res) => {

}

const getCart = async(req, res) => {

}

export {addToCart, removeFromCart, getCart}