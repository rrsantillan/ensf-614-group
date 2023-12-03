/**
 * SQL Setup
 */
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

/**
 * Email Setup
 */
const nodemailer = require('nodemailer');



const app = express();
app.use(cors());
app.use(express.json());


/**
 * Create connection 
 */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password1",
  database: "ensf_614"
})

// EMAIL - Setup nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ensf614group@gmail.com',  // Replace with your Gmail email address
      pass: 'aigo oqed zijo wtsg'        // Replace with your Gmail password or an App Password if using 2-factor authentication
    },
  });

// Import route modules for each .js file in route
const AdminRoutes = require('./routes/AdminRoutes')(db);
const AgentRoutes = require('./routes/AgentRoutes')(db);
const FlightRoutes = require('./routes/FlightRoutes')(db);
const InitRoutes = require('./routes/InitRoutes')(db);
const RegUserRoutes = require('./routes/RegUserRoutes')(db);
const HomeRoutes = require('./routes/HomeRoutes')(db);

// Use route modules (maybe add /api, ApiRoutes)
app.use('/admin', AdminRoutes);
app.use('/agent', AgentRoutes);
app.use('/flight', FlightRoutes);
app.use('/init', InitRoutes);
app.use('/reguser', RegUserRoutes);
app.use('/home', HomeRoutes);


app.listen(8081, () =>{
    console.log("Listening...")
  })


/** Define your route to send an email
 * used in: Payment.js, EmailFunctions.js
 * */ 
app.post('/api/send-email', async (req, res) => {
    
    const { to, subject, body } = req.body;
    
    const validatedTo = String(to).trim();

    // Setup email data
    const mailOptions = {
        from: 'ensf614group@gmail.com',  // Replace with your Gmail email address
        //   to: 'braden11tink@gmail.com',
          to: to,
        // to: validatedTo, 
        subject: subject,
        text: body,
    };
    console.log("API call, to field: ", mailOptions.to)

    try {
        // res.json({ message: "API call, trying to send..." });
        // Send the email
        console.log("API call, trying to send...");
        await transporter.sendMail(mailOptions);
    
        // Respond to the client
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.log(error)
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
