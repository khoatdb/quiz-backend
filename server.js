require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const quizRoutes = require('./routes/quiz');

// Initialize the App
// We create an instance of an Express application.
const app = express();

// Connect to Database
connectDB();

// Define the Port
// The server needs a 'door number' (a port) to listen on.
// 3000 is a common port for local development.
const PORT = 3000;

// --- Middleware ---
app.use(cors()); // Allow all cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Tell Express to use your routes
// Use the logic from quizRoutes
app.use(quizRoutes);

// Start the Server
// This tells our app to start listening for requests on the specified port.
// The function inside is a callback that runs once the server successfully starts.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});