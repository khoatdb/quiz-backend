// 1. Import Express
// We need to 'require' the express package we just installed.
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://khoatdb:qPOASu90PjsJzRfi@khoatdb.urqf16f.mongodb.net/quizdb?retryWrites=true&w=majority&appName=khoatdb"; 
// 2. Initialize the App
// We create an instance of an Express application.
const app = express();

// Add this function to your file
async function seedDatabase() {
    try {
        // Check if there are already questions in the database
        const count = await Question.countDocuments();
        if (count > 0) {
            console.log('Database already seeded.');
            return;
        }

        console.log('No questions found. Seeding database...');
        const questionsToSeed = [
            {
                question: "Which planet is known as the Red Planet?",
                answers: ["Earth", "Mars", "Jupiter", "Venus"],
                correctAnswer: "Mars",
                difficulty: "Easy"
            },
            {
                question: "What is the largest ocean on Earth?",
                answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
                correctAnswer: "Pacific",
                difficulty: "Easy"
            },
            // Add 3-5 more questions here...
        ];

        await Question.insertMany(questionsToSeed);
        console.log('Database seeded successfully!');

    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

// And call it after connecting
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB!');
        seedDatabase(); // Call the seed function here
    })
    .catch(err => console.error('Connection error', err));


// Create a Schema (blueprint) for our questions
const questionSchema = new mongoose.Schema({
    question: { 
        type: String, 
        required: true,
        minLength: 10 // Question must be at least 10 characters
    },
    answers: { 
        type: [String], 
        required: true,
        // Custom validation to ensure there are between 2 and 5 answers
        validate: [
            (val) => val.length >= 2 && val.length <= 5,
            'A question must have between 2 and 5 answers.'
        ]
    },
    correctAnswer: { 
        type: String, 
        required: true 
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard'] // Value must be one of these
    }
});

// Create a Model (factory) from the Schema
const Question = mongoose.model('Question', questionSchema);


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
// This endpoint now fetches questions from MongoDB
app.get('/api/questions', async (req, res) => {
  try {
    // Use the Question model to find all questions in the database
    const questions = await Question.find();
    
    // Send the questions back as a JSON response
    res.json(questions);
  } catch (error) {
    // If there's an error, send back a server error status
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
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
