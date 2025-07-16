// 1. Import Express
// We need to 'require' the express package we just installed.
const express = require('express');
const cors = require('cors');

// 2. Initialize the App
// We create an instance of an Express application.
const app = express();

// 3. Define the Port
// The server needs a 'door number' (a port) to listen on.
// 3000 is a common port for local development.
const PORT = 3000;

// --- Middleware ---
app.use(cors()); // Allow all cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Hardcoded data for our quiz
const questions = [
    { id: 1, question: "What is 2 + 2?", answers: ["3", "4", "5"] },
    { id: 2, question: "What is the capital of France?", answers: ["London", "Berlin", "Paris"] }
];

// 4. Create a Route (The "Hello World" Endpoint)
// app.get() tells the server what to do when it receives a GET request.
// The first argument '/' is the URL path (the homepage).
// The second argument is a function with two parameters: request (req) and response (res).
app.get('/', (req, res) => {
  // res.send() is how we send a response back to the browser.
  res.send('Hello World! Our server is working!');
});

app.get('/api/questions', (req, res) => {
  // res.send() is how we send a response back to the browser.
  res.json(questions);
});

app.post('/api/submit', (req, res) => {
  console.log('Received a submission!');
  // req.body contains the JSON data sent from the frontend
  console.log("req.body:");
  console.log(req.body);
  console.log("req.body.answers:");
  console.log(req.body.answers);
  
  // Send back a confirmation response
  res.status(200).json({ message: "Submission received successfully!" });
});

// 5. Start the Server
// This tells our app to start listening for requests on the specified port.
// The function inside is a callback that runs once the server successfully starts.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
