import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';
const protect = async(req,res,next)=>{
  try {
    // get token from header
    if(!req.headers.authorization){
      const err = new Error();
      err.message = "Please login first";
      err.statusCode = 401;
      return next(err);
    }
    const token = req.headers.authorization.split(" ")[1];
    
    // decode the token
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    
    const userID= decoded.userId;
    req.userId = userID;
    const user = await User.findById(req.userId);
    
    if(!user){
       const err = new Error();
       err.message = "User not found";
       err.statusCode = 401;
       return next(err);
    }


   return next();
  } catch (error) {
    return next(error);
  }
}
export default protect;
