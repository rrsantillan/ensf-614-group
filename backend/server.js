const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


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

/**
 * SignUp whihc adds row to user table  
 */
app.post('/Signup', (req, res) => {
    const sql = "INSERT INTO USERTABLE (USERNAME, PASSWORD) VALUES (?)"
    const values = [
        req.body.user,
        req.body.password
    ]

    db.query(sql, [values], (err, data) => {
      if(err){
        return res.json("Error");
      }
      return res.json(data);
     
    })
})

/**
 * Book flight updates row in db to add another seat to the taken seats 
 */

app.post('/bookflight', (req, res) => {
    const sql = "INSERT REGISTEREDTICKETS values (?, ?, ?)"
     //const sql = "UPDATE Flights SET TakenSeats = CONCAT(TakenSeats, ', ', ''?'') WHERE flightid = ?";
  
     db.query(sql, [req.body.username, req.body.flight_ID, req.body.SelectedSeat2], (err, data) => {
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
    const sql = "SELECT * FROM USERTABLE WHERE USERNAME = ? and PASSWORD = ?"
    
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
 */
app.post('/checkFlights', (req, res) => {
    const sql = "SELECT FLIGHTID, SOURCE, DESTINATION, DEPARTURE, LANDING FROM FLIGHTS WHERE SOURCE = ? and DESTINATION = ?"
    
    db.query(sql, [req.body.Source, req.body.Dest], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
       
        res.status(200).json({ flights: data });
    })
})

/**
 * get flights brings all data back where the dest and source match in the db
 */
app.post('/getFlights', (req, res) => {
    const sql = "SELECT * FROM REGISTEREDTICKETS WHERE FLIGHTID = ?"
    
    db.query(sql, [req.body.Source, req.body.Dest], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
       
        res.status(200).json({ flights: data });
    })
})



/**
 * getUnavailableSeats brings the list of seats taken
 */
app.post('/getUnavailableSeats', (req, res) => {
    const sql = "SELECT SEATNUMBER FROM REGISTEREDTICKETS WHERE FLIGHTID = ?"
    
    
    db.query(sql, [req.body.flight_ID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        const combinedSeatsString = data.map(row => row.SEATNUMBER).join(', ');
        const resultArray = [{ TakenSeats: combinedSeatsString }];
       
        res.status(200).json({ unSeats: resultArray  });
    })
})

app.listen(8081, () =>{
  console.log("Listening...")
})

