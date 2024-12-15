import express from 'express';
import { config } from 'dotenv';
import helmet from 'helmet';
import connectDb from './config/connectDatabase.js';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import fs from 'fs';


//  import routes 
import userRoutes from './routes/userRoutes.js'

// Load environment variables from .env file
config({ path: './.env' });


// Create an express app
const app = express();

// create log stream  
const logStream = fs.createWriteStream('access.log', { flags: 'a' });
app.use(morgan('dev', { stream: logStream }));

app.use(helmet());

app.use(cookieParser());

app.use(cors({
  origin: '*',
}))





// Connect to the database

await connectDb();


app.use(express.json()); 


// Routes 
//  useRoutes
const base = "/api/v1"
app.use(`${base}/user`,userRoutes)

//  error handling middleware
app.use(globalErrorHandler);
// Define the port
// process is the global object 
const port = process.env.PORT;

// Start the server
app.listen(port,  () => {
  console.log(`Server is running on port ${port}`);
});

// Export the app
export default app;