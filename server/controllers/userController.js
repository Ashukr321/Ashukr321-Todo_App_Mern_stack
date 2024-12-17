import  User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import configEnv from "../config/configEnv.js";


// create user 
const createUser = async(req,res,next)=>{
  try {
    //  destructure req body data 
    const {axy,userName , email ,password} = req.body;
     
    if(!userName || !email || !password){
      const err= new Error();
      err.message = "All fields are required";
      err.statusCode = 400;
      return next(err);
    }
    const exitsUser = await User.findOne({email});
    
    // check user already exits or not
    if(exitsUser){
      const err= new Error();
      err.message = "User already exits";
      err.statusCode = 400;
      return next(err);
    }

    //  upload image to cloudinary
    cloudinary.config({
      cloud_name: configEnv.cloudinary_cloud_name,
      api_key: configEnv.cloudinary_api_key,
      api_secret: configEnv.cloudinary_api_secret,
    });
    const result = await cloudinary.uploader.upload(req.file.path);
    const profilePhoto = result.secure_url;
    // delete image from server
    fs.unlinkSync(req.file.path);


     
    //  hashed  password
    const HashedPassword = await bcrypt.hash(password,10);


     
    // create new User
    const newUser = new User({
      profilePhoto:profilePhoto,
      userName,
      email,
      password:HashedPassword
    })

    // create token 
    const token = jwt.sign({userId:newUser._id},configEnv.jwt_secret,{
      expiresIn:"90d"
    })

    // save user 
    await newUser.save();
    res.status(201).json({
      success:true,
      message:"User created successfully",
      token,
    })

  } catch (error) {
    return next(error);
  }
}

// login user with email and password 
const loginUser  = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return next(createError("All fields are required", 400));
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError("User  not found", 400));
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(createError("Password is incorrect", 400));
    }

    
    // Create a new token
    const token = jwt.sign({ userId: user._id }, configEnv.jwt_secret, {
      expiresIn: "90d",
    });  
    
    // // SET token in cookies 
    // res.cookie('token',token,{
    //   expires:new Date(new Date() + (process.env.COOKIES_EXPIRE*24*60*60*1000)),
     
    //   // httpOnly:true,
    // })


    // Send response
    res.status(200).json({
      success: true,
      token,
      message: "User  logged in successfully",
      user: { id: user.userName, email: user.email,profilePhoto:user.profilePhoto } // Optionally include user info
    });


  } catch (err) {
    return next(err);
  }
};

//  get user profile info
const profileInfo= async(req,res,next)=>{

  try {
    // decode token and get id 
    
    const user = await User.findById({_id:req.userId});
    // check user exits or not
    if(!user){
      const err= new Error();
      err.message = "User not found";
      err.statusCode = 400;
      return next(err);
    }


    res.status(200).json({
      success:true,
      user:user
    })

  } catch (error) {
    return next(error);
  }
}



const logout = async(req,res,next)=>{
  try {
    res.clearCookie("token");
    res.status(200).json({
      success:true,
      message:"User logout successfully"
    })
  } catch (error) {
    return next(error);
  }
}

//  delete Account
const deleteAccount = async(req,res,next)=>{
  try {
    if(!req.userId){
      const err= new Error();
      err.message = "User not found";
      err.statusCode = 400;
      return next(err);
    }
  await  User.findByIdAndDelete(req.userId);
    res.status(200).json({
      success:true,
      message:"User deleted successfully"
    })

  } catch (error) {
    return next(error);
  }
}


// Utility function to create errors
function createError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}


export {createUser,loginUser,profileInfo,logout,deleteAccount}
