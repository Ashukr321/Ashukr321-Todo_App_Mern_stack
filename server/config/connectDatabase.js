import { config } from 'dotenv';
import mongoose from 'mongoose';
config();
const connectDb  = async ()=>{
  try {
    await mongoose.connect(
    process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error.message);
  }
}

export default connectDb;