const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Authentication routes with app. change to router.


/**
 * getRegTicket gets all sold tickets for a flight
 * used in: AgentView.js 
 */
router.post('/getRegTicket', (req, res) => {
    const sql = "SELECT * FROM tblTicket WHERE FLIGHTID = ?"
   
    db.query(sql, [req.body.flightID2], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        console.log("Data returned from the database:", data);
        res.status(200).json({ registeredTickets: data });
       
    })
})


/**
 * getAllFlights gets all flights in database
 * used in: AgentView.js
 */
router.post('/getAllFlights', (req, res) => {
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

return router;
};