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

// Setup nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ensf614group@gmail.com',  // Replace with your Gmail email address
      pass: 'aigo oqed zijo wtsg'        // Replace with your Gmail password or an App Password if using 2-factor authentication
    },
  });



/**
 * SignUp which adds row to user table  
 */
app.post('/Signup', (req, res) => {
    const sql = "INSERT INTO TBLUSER (USERNAME, PASSWORD, PROFILE, EMAIL, DOB) VALUES (?, ?, ?, ?, ?)"
    
    const values = [
        req.body.user,
        req.body.password,
        req.body.email
    ]
    console.log(values)
    db.query(sql,  [req.body.user, req.body.password, 'REGUSER', req.body.email, '1982-10-17 00:00:00'], (err, data) => {
      if(err){
        return res.json("Error");
      }
      console.log(data)
      return res.json(data);
     
    })
})

/**
 * Book flight updates row in db to add another seat to the taken seats 
 */

app.post('/bookflight', (req, res) => {
    const sql = "INSERT tblTicket values (?, ?, ?, ?, ?, ?, ?)"
    db.query(sql, ['0', req.body.values.username, req.body.values.flight_ID, req.body.values.SelectedSeat, '1', req.body.price, req.body.values.Insurance], (err, data) => {
       if (err) {
            console.error('Error updating taken seats:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
       } else {
            return res.json("Success") 
       }
     })
  });

/**
 * Login ensures the user is part of the system 
 */
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM TBLUSER WHERE USERNAME = ? and PASSWORD = ?"
    
    db.query(sql, [req.body.user, req.body.password], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            res.status(200).json({ user: data });
        } else {
            return res.json("Failed") 
        }
    
    })
})

/**
 * check flight brings all data back where the dest and source match in the db
 * used in EditFLightForm.js to look for flights
 */
app.post('/checkFlights', (req, res) => {
    
    const sql = "SELECT FLIGHTID, AIRPLANEID, ORIGIN, DESTINATION, DEPARTURETIME, ARRIVALTIME FROM tblFlight WHERE ORIGIN = ? and DESTINATION = ?"
    db.query(sql, [req.body.Source, req.body.Dest], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
       
        res.status(200).json({ flights: data });
    })
})

/**
 * get all aircraft IDs
 * used for populating dropdown list in FlightForm.js and EditFlightForm.js where flights are added to system
 */
app.post('/getAircraftIDs', (req, res) => {
    const sql = 'SELECT AIRPLANEVIN, MODEL FROM tblAirplane';
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (data.length > 0) {
            console.log("Data returned from the database:", data);
            res.status(200).json({ planes: data }); // Send the data as { planes: data }
        } else {
            console.log("No data returned from the database.");
            res.status(200).json({ planes: [] }); // Send an empty array if there's no data
        }
    })
})

/**
 * get flights brings all data back where the dest and source match in the db
 */
app.post('/getFlights', (req, res) => {
    const sql = "SELECT * FROM tblFlight LEFT JOIN tblTicket ON tblFlight.FlightID = tblTicket.FLIGHTID WHERE USERNAME = ?"
    console.log(req.body.username)
    db.query(sql, [req.body.username], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (data.length > 0) {
            console.log("Data returned from the database:", data);
        } else {
            console.log("No data returned from the database.");
        }

        res.status(200).json({ flights: data });
    })
})



/**
* search for flight by flightID
* used in editflightform.js for getting data for selected flight
*/
app.post('/getFlightByFlightID', (req, res) => {
  
    const sql = "SELECT * FROM tblFlight WHERE flightID = ?"

    console.log(req.body.flightID2) // displays the currently selected flightID
    db.query(sql, [req.body.flightID2], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
      
        res.status(200).json({ flights: data });
      })
 })
 
 
 /**
 * WORK IN PROGRESS
 * overwrite flight data based on flightID
 */
 app.post('/overwriteFlightsByFlightID', (req, res) => {
    const { destination, ORIGIN, departureTime, landingTime, flightID, aircraftid } = req.body;
    const sql = "UPDATE tblFlight SET ORIGIN = ?, DESTINATION = ?, DEPARTURE = ?, LANDING = ?, AIRPLANEID = ? WHERE FLIGHTID = ?;"
    console.log("selected FlightID: ", req.body.flightID)
    db.query(sql, [ORIGIN, destination, departureTime, landingTime, flightID, aircraftid], (err, data) => {
        if (err) {
             console.error('Error couldn\'t find flight:', err);
             return res.status(500).json({ error: 'Internal Server Error' });
        } else {
             return res.json("Success")
        }
      })
 })
 
 

/**
 * get flights brings all data back where the dest and source match in the db
 */
app.post('/getAllFlights', (req, res) => {
    const sql = "SELECT * FROM tblFlight"
    console.log(req.body.username2)
    db.query(sql, [req.body.username2], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (data.length > 0) {
            console.log("Data returned from the database:", data);
        } else {
            console.log("No data returned from the database.");
        }

        res.status(200).json({ flights: data });
    })
})
/**
 * get flights brings all data back where the dest and source match in the db
 */
app.post('/getAirPlaneSeatMap', (req, res) => {
    const sql = "SELECT tblAirplane.ROWCNT, tblAirplane.COLCNT FROM tblAirplane LEFT JOIN TBLFLIGHT ON tblAirplane.AIRPLANEID = TBLFLIGHT.AIRPLANEID WHERE tblflight.flightid = ?"
    
    db.query(sql, [req.body.flightID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (data.length > 0) {
            console.log("Data returned from the database:", data);
        } else {
            console.log("No data returned from the database.");
        }
        
        res.status(200).json({ seatMap: data });
    })
})



/**
 * delete ticket
 */
app.post('/deleteTicket', (req, res) => {
    const sql = "delete from tblTicket where FlightID = ? and SEATNUMBER = ?"
    
    db.query(sql, [req.body.FLIGHTID, req.body.SEATNUMBER],(err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        } else {
            return res.json("Success") 
        }
           
    })
})

/**
 * get Crew brings all data back where the dest and source match in the db
 */
app.post('/getCrew', (req, res) => {
    const sql = "SELECT tblCrew.CREWID, tblCrew.FNAME FROM tblCrew LEFT JOIN tblAssignedCrew on tblCrew.CREWID = tblAssignedCrew.CREWID WHERE tblAssignedCrew.FLIGHTID IS null"
    
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        const combinedCrewString = data.map(row => row.FNAME).join(', ');
        const resultArray = [{ Name: combinedCrewString }];
       
        res.status(200).json({ crew: data });

    
    })
})


/**
 * get Crew brings all data back where the dest and source match in the db
 */
app.post('/getAssignedCrew', (req, res) => {
    const sql = "SELECT tblCrew.CREWID, tblCrew.FNAME FROM tblCrew LEFT JOIN tblAssignedCrew on tblCrew.CREWID = tblAssignedCrew.CREWID WHERE tblAssignedCrew.FLIGHTID = ?"
    
    db.query(sql, [req.body.FLIGHTID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        const combinedCrewString = data.map(row => row.FNAME).join(', ');
        const resultArray = [{ Name: combinedCrewString }];
       
        res.status(200).json({ crew: data });

    
    })
})

/**
 * Update Crew brings all data back where the dest and source match in the db
 */
app.post('/updateCrew', async (req, res) => {
    const { FLIGHTID, updatedCrew } = req.body;
    console.log(FLIGHTID)
    // Assuming you have a table named CREW in your database
    const deleteQuery = 'DELETE FROM tblAssignedCrew WHERE FLIGHTID = ?';
    const insertQuery = 'INSERT INTO tblAssignedCrew (FLIGHTID, CREWID) VALUES (?, ?)';
  
    try {
      // Delete all existing crew records for the given FLIGHTID
        db.query(deleteQuery, [FLIGHTID]);
  
      // Insert the updated crew data
      console.log('Updated Crew:', updatedCrew);

      for (const crew of updatedCrew) {
        const { CREWID, FNAME } = crew;
        db.query(insertQuery, [FLIGHTID, CREWID]);
        console.log("HERE")
      }
  
      // Send a success response
      res.status(200).json({ message: 'Crew updated successfully' });
    } catch (error) {
      console.error('Error updating crew:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  



/**
 * get flights brings all data back where the dest and source match in the db
 */
app.post('/addFlight', (req, res) => {
    const sql = "INSERT INTO tblFlight ( AIRPLANEID, ORIGIN, DESTINATION, DEPARTURETIME, ARRIVALTIME) VALUES(?, ?, ?, ?, ?)"
   
    db.query(sql, [req.body.aircraftid, req.body.destination, req.body.source,  
        req.body.departureTime, req.body.landingTime], (err, data) => {
        
        console.log("SQL Query:", sql); // Log the SQL query
        if(err){
            return res.json("Error");
         }
        return res.json();
        
    })
})

/**
 * Insert new aircraft
 */
app.post('/addAircraft', (req, res) => {
    const sql = "INSERT INTO tblAirplane (AIRPLANEVIN, MODEL, ROWCNT, COLCNT) VALUES(?, ?, ?, ?)"
   
    db.query(sql, [req.body.aircraftid, req.body.model, req.body.rows, req.body.columns], (err, data) => {
        
        console.log("SQL Query:", sql); // Log the SQL query
        if(err){
            return res.json("Error");
         }
        return res.json();
        
    })
})

/**
 * Insert new aircraft
 */
app.post('/removeAircraft', (req, res) => {
    const sql = "DELETE FROM tblAirplane WHERE AIRPLANEVIN = ?";
   
    db.query(sql, [req.body.aircraftid], (err, data) => {
        console.log("SQL Query:", sql); // Log the SQL query
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.json({ error: 'Error removing aircraft' });
        }
        return res.json({ success: true });
    });
});


/**
 * getUnavailableSeats brings the list of seats taken
 */
app.post('/getUnavailableSeats', (req, res) => {
    const sql = "SELECT SEATNUMBER FROM tblTicket WHERE FLIGHTID = ?"
    
    
    db.query(sql, [req.body.flight_ID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        const combinedSeatsString = data.map(row => row.SEATNUMBER).join(', ');
        const resultArray = [{ TakenSeats: combinedSeatsString }];
       
        res.status(200).json({ unSeats: resultArray  });
    })
})

/**
 * getUnavailableSeats brings the list of seats taken
 */
app.post('/getRegTicket', (req, res) => {
    const sql = "SELECT * FROM tblTicket WHERE FLIGHTID = ?"
   
    db.query(sql, [req.body.flightID2], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        console.log("Data returned from the database:", data);
        res.status(200).json({ registeredTickets: data });
       
    })
})





app.listen(8081, () =>{
  console.log("Listening...")
})



//////////////////////////////////////////////////////////
// Define your route to send an email
app.post('/api/send-email', async (req, res) => {
    console.log("Here")
    const { to, subject, body } = req.body;
  
    // Setup email data
    const mailOptions = {
      from: 'ensf614group@gmail.com',  // Replace with your Gmail email address
      to: 'braden11tink@gmail.com', 
      subject: 'test',
      text: body,
    };
  
    try {
      // Send the email
      await transporter.sendMail(mailOptions);
  
      // Respond to the client
      res.json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
