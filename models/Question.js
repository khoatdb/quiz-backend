const mongoose = require('mongoose');

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
// The model is created from the schema and exported
module.exports =  mongoose.model('Question', questionSchema);