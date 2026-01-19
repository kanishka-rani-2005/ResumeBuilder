import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Resume from "../models/Resume.js";




const generateToken = (userId) => {
    //function to generate JWT token
    const token=jwt.sign({id:userId}, process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
    return token;
}




//contoller for user registration
//Post :/api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        const token = generateToken(newUser._id);
        newUser.password = undefined;
        return res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            token
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


//controller for user login
//Post :/api/users/login
export const loginUser = async (req,res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        //compare password

        if(!user.comparePassword(password)){
            return res.status(401).json({message:"Invalid credentials"});
        }

        const token= generateToken(user._id);
        user.password=undefined;//hide password in response
        return res.status(200).json({
            message:"User logged in successfully",
            user,
            token
        });
    }catch(error){
        return res.status(400).json({message:error.message});
    }
}





//controller for fetching user profile
//Get :/api/users/data

export const getUserById = async (req,res) => {
    try{
        const userId = req.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        user.password=undefined;//hide password in response
        return res.status(200).json({user});

    }catch(error){
        return res.status(400).json({message:error.message});
    }
}



//controller for geting user resumes
//Get :/api/users/resumes

export const getUserResumes=async (req,res)=>{
    try{
        const userId=req.userId;
        const resumes=await Resume.find({userId});
        return res.status(200).json({resumes});
    }
    catch(error){
        return res.status(400).json({message:error.message});
    }
}
