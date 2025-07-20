const mongoose = require('mongoose');
const Question = require('../models/Question');

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

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
    await seedDatabase(); 
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;