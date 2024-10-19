import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator"
import 'dotenv/config'


//login User
const loginUser = async(req, res) => {
    await userModel.pos
}


//jwt Token
const createToken = (id) => {
    return jwt.sign({id},)
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

        //pull from req.body
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save()
    }catch (error){
        res.json({message: error.message})
    }
}

export {loginUser, registerUser}