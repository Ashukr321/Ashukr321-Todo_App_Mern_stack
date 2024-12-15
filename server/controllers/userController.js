import  User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


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
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
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
    const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET,{
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
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "90d",
    });  
  


    // Send response
    res.status(200).json({
      success: true,
      message: "User  logged in successfully",
      token,
      user: { id: user.userName, email: user.email } // Optionally include user info
    });

  } catch (err) {
    return next(err);
  }
};



// Utility function to create errors
function createError(message, statusCode) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

export {createUser,loginUser}
