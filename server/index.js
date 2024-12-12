import express from 'express';
import { config } from 'dotenv';
import helmet from 'helmet';
import connectDb from './config/connectDatabase.js';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler.js';
import { Error } from 'mongoose';

// Load environment variables from .env file
config({ path: './.env' });

// Create an express app
const app = express();

// Use helmet middleware to secure the app
// all the configuration of the securirty 
// we can create the object and pass into it 
app.use(helmet());

// Enable cors 
/**
Configure CORS middleware to allow cross-origin requests
Enables all origins ('*') and allows GET, POST, PUT, DELETE methods
This middleware handles preflight requests and sets appropriate CORS headers */
app.use(cors({
  origin: '*',
}))




// Connect to the database

await connectDb();


// Middleware to parse JSON (optional, but useful for future use)
// It examines incoming requests with JSON payloads (Content-Type: application/json)
// Automatically parses the JSON data
// Places the parsed data in req.body for easy access
app.use(express.json()); 


// Routes 

app.get('/',  (req, res, next) => {
  const err = new Error();
  err.message = 'server side error';
  err.statusCode = 400;
  return next(err);
});

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