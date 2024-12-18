import express from "express";
import multer from "multer";
import protect from "../middleware/protectRouteHandler.js"
import { createUser,loginUser ,profileInfo ,logout,deleteAccount,verifyUser} from "../controllers/userController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, profilePhoto, cb) => {
   return cb(null, "./uploads");
  },
  filename: (req, profilePhoto, cb) => {
  return  cb(null, `${profilePhoto.originalname}`);
  },
})
const upload = multer({ storage: storage });



// Route for user registration with file upload
router.post('/register', upload.single('profilePhoto'),createUser);
router.post('/login',loginUser);
router.post('/verifyUser',verifyUser);
router.get('/profileInfo',protect,profileInfo);
router.get('/logout',protect,logout);
router.get('/deleteAccount',protect,deleteAccount);



export default router;