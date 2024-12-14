import express from "express";
import multer from "multer";

import { createUser  } from "../controllers/userController.js";

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


export default router;