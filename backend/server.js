const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const connectDatabase = require("./database/conn");
// const checkLoggedIn = require('./routes/authMiddleware');
const User = require('./models/user');
const Event = require('./models/event');
const Admin = require('./models/admin')

// Middlewares
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

// Port Number
const port = 5000;



// app.post('/login',  async(req, res) => {
//     const email = req.cookies.email;
//     if(email === undefined){
//       res.json({success: true});
//     }
//     else{
//       res.json({success: false});
//     }
// });

// app.get('/login', (req, res) =>{
//   const email = req.cookies.email;
//   console.log(email);
//   if(email === undefined){
//       res.sendFile(__dirname + '/login.html');
//   }
//   else{
//       console.log(email);
//       user = {email: email};
//       db.reloginUser(user, res);
//   }
// })

app.get('/checkAuth', async(req, res) => {
  const email = req.cookies.email;
  console.log(email);
  if(email === undefined){
    console.log('/checkAuth');
    res.json({success: false, message: 'Not Logged In'});
  }
  else{
    res.json({success: true, message: 'Already Logged In'})
  }
})


app.post('/login', async(req, res) => {
  const {email, password} = req.body;
  const admin = await Admin.findAndValidate({email, password});
  try{
    if(admin) {
        res.cookie("email", admin.email, {maxAge: 24*60*60*1000});
        res.json({success: true,  message: 'Login successful'});
      }
      else{
        res.json({success: false, message: 'Invalid credentials'});
      }
    }
    catch(error) {
      res.status(404).json({success: false, message: 'An error occurred'});
    }
});


// app.post('/addAdmin', async (req, res) => {
//     console.log('Enters in /addAdmin Route');
//     const {name, registrationNumber, email,  adminType, course, branch, year} = req.body;
//     const password = registrationNumber;
//     try{
//       let admin = new Admin({name, registrationNumber, password, email, adminType, course, branch, year});
//       await admin.save();
//       res.json({success: true, message:'Admin created successfully'});
//     }
//     catch(error) {
//       res.json({success: false, message: 'Error occured'});
//     }
// });




// app.post('/addUser', async (req, res) => {
//   console.log('Enters in /addUser Route');
//   const {name, registrationNumber, email, course, branch, year} = req.body;
//   const password = registrationNumber;
//   console.log(name, registrationNumber, password, course, branch, year);
//   try{
//     let user = new User({name, registrationNumber, password, email, course, branch, year});
//     console.log(user);
//     await user.save();
//     res.json({success: true, message:'Admin created successfully'});
//   }
//   catch(error) {
//     res.json({success: false, message: 'Error occured'});
//   }
// });




app.post('/api/addEvent', async(req, res) => {
  let {name, startDate, endDate} = req.body;
  
  let eventName = name;
  try{
    let event = new Event({eventName, startDate, endDate});
    await event.save();
    res.json({success: true, message: 'Event created successfully'});
  }
  catch(error) {
    res.json({success: false, message: 'Error occurred'});
  }
});












app.get('/api/home', async(req, res) => {
  
  const userData = await User.find();
  if(userData) {
    console.log("data is ", userData);
    res.json(userData);
  }
  else{
    console.log("userData is not found");
    res.json([]);
  }
})


app.get('/api/Student', async(req, res) => {
  const userData = await User.find();
  if(userData) {
    console.log("data is ", userData);
    res.json(userData);
  }
  else{
    console.log("userData is not found");
    res.json([]);
  }
})


app.get('/api/Admin', async(req, res) => {
  const adminData = await Admin.find();
  if(adminData) {
    // console.log(adminData)
    res.json(adminData);
  }
  else{
    res.json([]);
  }
})


app.get('/api/Event', async(req, res) => {
  const eventData = await Event.find();
  if(eventData) {
    res.json(eventData);
  }
  else{
    res.json([]);
  }
})






app.post('/api/add-student',async(req,res) => {
    console.log('Enters in /add-student post Route');
    const {name, registrationNumber, email, course, branch, year} = req.body;
    const password = registrationNumber;
    console.log(name, registrationNumber, password, course, branch, year);
    try{
      let user = new User({name, registrationNumber, password, email, course, branch, year});
      console.log(user);
      await user.save();
      res.json({success: true, message:'Admin created successfully'});
    }
    catch(error) {
      res.json({success: false, message: 'Error occured'});
    }
})


app.post('/api/add-Admin', async (req, res) => {
  console.log('Enters in /addAdmin Route');
  const {name, registrationNumber, email,  adminType, position, course, branch, year} = req.body;
  const password = registrationNumber;
  // console.log(req.body);
  try{
    let admin = new Admin({name, registrationNumber, password, email, adminType, position, course, branch, year});
    // console.log(position)
    await admin.save();
    res.json({success: true, message:'Admin created successfully'});
  }
  catch(error) {
    res.json({success: false, message: 'Error occured'});
  }
});






// app.get('/showUsers', async(req, res) => {
//   const userData = await User.find();
//   if(userData) {
//     res.json(userData);
//   }
//   else{
//     res.json([]);
//   }
// })


// app.get('/showEvents', async(req, res) => {
//   const eventData = await Event.find();
//   if(eventData) {
//     res.json(eventData);
//   }
//   else{
//     res.json([]);
//   }
// })


// app.post('/takeAttendance', async (req, res) => {
//   // Retrieve the eventName and userEmail from the request body
//   const { eventName, userEmail } = req.body;
//   const user = await User.findOne({ email: userEmail });

//   // Check if the eventName and userEmail are valid and not empty
//   if (!eventName || !user) {
//     return res.status(400).json({ success: false, message: 'Invalid request data' });
//   }

//   const exist = user.events.includes(eventName);

//   if (exist) {
//     return res.json({ success: true, message: 'Attendance already recorded' });
//   }

//   user.events.push(eventName);
//   await user.save();

//   // Assuming the attendance logic is successful, send a success response
//   res.json({ success: true, message: 'Attendance recorded successfully' });
// });




// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});