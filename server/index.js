import express from 'express';
import { config } from 'dotenv';

// Load environment variables from .env file
config({ path: './.env' });

// Create an express app
const app = express();

// Middleware to parse JSON (optional, but useful for future use)
app.use(express.json());

// Routes 
app.get('/', (req, res) => {
  res.send("Welcome Ashutosh, well done! Keep going.");
});

// Define the port
const port = process.env.PORT;

// Start the server
await app.listen(port,  () => {
  console.log(`Server is running on port ${port}`);
});

// Export the app
export default app;