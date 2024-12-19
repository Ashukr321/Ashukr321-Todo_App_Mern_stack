import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  profilePhoto: {
    type: String,
  },
  userName: {
    type: String,
    required: [true, "Username is required."],
    minlength: [3, "Username must be at least 3 characters."],
    trim: true, // Automatically trim whitespace
   
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    lowercase: true, // Automatically convert to lowercase
    unique: true, // Ensure email is unique
    trim: true, // Automatically trim whitespace
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [8, "Password must be at least 8 characters."],
    
  },
  otp:{
    type:String,
    default:"0"
  },
  optExpired:{
    type:String,
    default:Date
  },

}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

// Create and export userModel 
const User = mongoose.model("User ", userSchema);
export default User; 