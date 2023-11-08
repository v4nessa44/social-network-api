// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter')
const thoughtRouter = require('./routes/thoughtsRouter')

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Define middleware to parse JSON data
app.use(express.json());  // Javascript object notation

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/social-db', {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');


  app.get('/', (req, res) => {
    res.send('Welcome to Social API')
  })

  app.use('/api/users', userRouter)
  app.use('/api/thoughts', thoughtRouter)

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
