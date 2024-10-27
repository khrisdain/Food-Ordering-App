import userModel from "../models/userModel.js"

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;  // only itemId is needed in the request

        const userData = await userModel.findOne({ _id: userId }); //fetch userData from database

        // Initialize or update the cart data
        let cartData = userData.cartData || {};
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        // Update the user's cart in the database
        await userModel.findOneAndUpdate(
            { _id: userId },
            { cartData },
            { new: true }
        );

        res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



const removeFromCart = async(req, res) => {
    try {
        const { userId, itemId } = req.body;

        //fetch user data
        const userData = await userModel.findById(userId);
        if (!userData) return res.status(404).json({ success: false, message: "user not found"})
        
        let cartData = userData.cartData || {};
        if (!cartData[itemId]) return res.json({ success: false, message:"Item not in cart"})
        
        //Decrease item quantity or remove if it's 0
        cartData[itemId] = cartData[itemId] - 1;

        await userModel.findByIdAndUpdate(userId, { cartData: cartData}, {new: true})
        
        res.json({success: true, message: "Item removed from cart"})
    }
    catch(error){
        console.log("Error removing from the cart:", error)
        res.status(500).json({success: false, message: "Internal server error"})
    }
}

const getUserCart = async(req, res) => {
    try{
        const { userId } = req.body;

        const user = await userModel.findOne({_id: userId}, {cartData: 1})
        
        if(!user) return res.status(404).json({ success: false, message:"User not found"})
        
        const cartData = user.cartData || {};
        
        //check if the user has an item in their cart
        if(Object.keys(cartData).length === 0) return res.json({success: true, message: "User's cart is empty"})
        res.json({success: true, cartData})
    

    }catch (error){
        console.log(error)
        res.status(500).json({success: false, message:"Internal server error"})
    }
}

export {addToCart, removeFromCart, getUserCart}