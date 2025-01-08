import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing userOrder from frontend
const placeOrder = async(req, res) => {
    /*frontend url for stripe */
    const frontend_url = "http://localhost:5173"
    try {
        const newOrder = new orderModel({
            userId: req.body.userId, //from auth middleware
            item: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await newOrder.save(); //save to database
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}})   //update the user cart and clear cartData
        
        /*Stripe payment setup */
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100*80
            },
            quantity: item.quantity
        }))


        /*Post delivery charges */
        line_items.push({
          price_data: {
            currency: "inr",
            product_data: {
                name: "Delivery Charges"
            },
            unit_amount: 2*100*80
          },
          quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`, //redirects to the specific userId order after successful payment
            cancel_url: `${frontend_url}/verify?success=false&orderId=${ newOrder._id }`
        });

        res.json({ success: true, session_url:session.url })
        
    } catch(error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}


const verifyOrder = async(req, res) => {
    const { orderId, success} = req.body;
    try{
        if (success == "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            res.json({success: true, message: "paid"})
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false, message:"payment failed"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Payment failed"})
    }
}

//users order for frontend
const userOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders})
    }
    catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}


//List every ordered item for admin
const listOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders})
    }
    catch (error){
        console.log(error);
        res.json({ success: false, message: "Error"})
    }
}

//APi for updating the food order status
const updateStatus = async (req, res) => {
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
        res.json({ success: true, message: "Status Updated"})
    }
    catch(error){
        console.log(error)
        res.json({success: false, message:"Error"})
    }
}


export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } 