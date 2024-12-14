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

    // create token 
    const token =jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"1d"});

    // create new User
    const newUser = new User({
      profilePhoto:profilePhoto,
      userName,
      email,
      password:HashedPassword
    })

    // save user 
    await newUser.save();
    res.status(201).json({
      success:true,
      message:"User created successfully",
      token:token
    })
  } catch (error) {
    return next(error);
  }
}


export {createUser}