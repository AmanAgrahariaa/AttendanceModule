const express = require('express');
const bodyParser = require('body-parser');
const connectionDB = require('./db/conn');
const Users = require('./models/user');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Express backend
app.post('/login', async(req, res) => {
  try {
    const { email, password } = req.body;

    console.log('/login route... POST request');
    console.log(email, password);
    
    const user =   await Users.findAndValidate({ email, password});

    // user = true;

    // Check login credentials and authenticate the user
    if (user) {
      // Return a JSON response indicating success
     
      res.json({ success: true, message: 'Login successful' });
    } else {
    
      // Return a JSON response indicating failure
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    // Handle the error here
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});




app.post('/register',  async(req, res) => {
  const { name, email, password, course, branch, year } = req.body;

  console.log('/register route... POST request');
  // console.log(name, email);

  try {
    const user = new Users({ name, email, password, course, branch, year });
    console.log(user);

    // Save the user to the database
    await user.save();

    // Return a JSON response indicating success
    res.json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Error:', error);
    // Return a JSON response indicating failure
    res.json({ success: false, message: 'Error occurred during registration' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
