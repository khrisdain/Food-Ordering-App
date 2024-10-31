import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator"
import 'dotenv/config'

//jwt generation
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
};


//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await userModel.findOne({ email })
        //check if user exists
        if(!user) return res.status(400).json({success: false, message: "User doesn't exists"})

        //Match user password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({success: false, message:"Invalid Credential"})
        
        const token = createToken(user._id);
        res.status(200).json({success:true, token})
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"})
    }
};



//Register a User
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    console.log(req.body)
    try{
        //check if user already exists
        const exists = await userModel.findOne({ email })
        if(exists) {return res.status(400).json({success: false, message: "User already exists"})}

        //validate email usef in registeration
        if(!validator.isEmail(email)) {return res.status(400).json({success: false, message: "Invalid email"})}
        
        //Validate password length
        if(password.length < 8) {return res.status(400).json({success: false, message: "password is too weak "})}

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword}); //create user details wrt ajusted args
        const user = await newUser.save();

        
        const token = createToken(user._id);
        res.status(201).json({success: true, token});
        
    } catch(error){
        console.error(error)
        res.status(500).json({success: false, message:"Internal server error"})
    }
}

export {loginUser, registerUser}

