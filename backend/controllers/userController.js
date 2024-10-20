import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator"
import 'dotenv/config'


//login User
const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success: false, message:"User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, message:"invalid credential"})
        }
        const token = createToken(user._Id)
        res.json({success:true, token})

    }catch(error){
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}


//jwt Token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET) //args: Payload and Signature
}

//register user
const registerUser = async(req, res) => {
    const {name, password, email} = req.body
    try{
        //check if user exists 
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false, message:"user already exists"})
        }
        else{

        }

        //Validating email format & strong password
        if(!validator.isEmail(email)){
            res.json({success: false, message:"pls enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success: false, message:"Pls enter a strong password"})
        }

        //hasing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //pull from req.bodyhttp
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success: true, token})
    }catch (error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

export {loginUser, registerUser}