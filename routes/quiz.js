const express = require('express');
const router = express.Router();
// Import your models at the top
const Question = require('../models/Question');

// This route now corresponds to GET /api/questions
router.get('/api/questions', async (req, res) => {
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

// This route now corresponds to POST /api/submit
router.post('/api/submit', async (req, res) => {
  console.log('Received a submission!');
  // req.body contains the JSON data sent from the frontend
  console.log("req.body:");
  console.log(req.body);
  console.log("req.body.answers:");
  console.log(req.body.answers);
  
  // Send back a confirmation response
  res.status(200).json({ message: "Submission received successfully!" });
});

// Export the router so it can be used in server.js
module.exports = router;