const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Authentication routes with app. change to router.
    
    /**
 * delete users ticket for given flight and seat
 * used in: ViewTicket.js 
 */
router.post('/deleteTicket', (req, res) => {
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
 * get flights brings all ticket data for a particular user user
 * used in: ViewTicket.js
 */
router.post('/getFlights', (req, res) => {
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
 * Login ensures the user is part of the system 
 */
router.post('/getUserProfile', (req, res) => {
    const sql = "SELECT EMAIL FROM TBLUSER WHERE USERNAME = ?"
    db.query(sql, [req.body.user], (err, data) => {
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


return router;
};