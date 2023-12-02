const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Authentication routes with app. change to router.

/**
 * checkFlights gets all flight data back where the dest and source match in the db
 * used in: FindFlight.js, EditFLightForm.js 
 */
router.post('/checkFlights', (req, res) => {
    
    const sql = "SELECT FLIGHTID, AIRPLANEID, ORIGIN, DESTINATION, DEPARTURETIME, ARRIVALTIME FROM tblFlight WHERE ORIGIN = ? and DESTINATION = ?"
    db.query(sql, [req.body.Origin, req.body.Dest], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
       
        res.status(200).json({ flights: data });
    })
})

/**
 * checkPromoCode For the given user
 * used in: BookFlight.js
 */
router.post('/checkPromoCode', (req, res) => {
    console.log(req.body.User, req.body.Promo)
    const sql = "SELECT YEARLYPROMO, PROMOCODE FROM TBLUSER WHERE USERNAME = ? and PROMOCODE = ? and YEARLYPROMO = 0"
    const updateQuery = 'UPDATE TBLUSER SET YEARLYPROMO = 1 where USERNAME = ? and PROMOCODE = ? ';
    db.query(sql, [req.body.User, req.body.Promo], (err, data) => {
        if(err){
            return res.json("Error");
        }
        if(data.length > 0){
            db.query(updateQuery, [req.body.User, req.body.Promo]);
            return res.json("Yes");
            
        } else {
            return res.json("No") 
        }
    
    })
})


/**
 * getAirPlaneSeatMap gets seating size in rows and columns for plane assigned to flight
 * used in: BookFlight.js
 */
router.post('/getAirPlaneSeatMap', (req, res) => {
    const sql = "SELECT tblAirplane.ROWCNT, tblAirplane.COLCNT FROM tblAirplane LEFT JOIN TBLFLIGHT ON tblAirplane.AIRPLANEVIN = TBLFLIGHT.AIRPLANEID WHERE tblflight.flightid = ?"
    
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
 * getUnavailableSeats gets the list of seats already sold
 * used in: BookFlight.js
 */
router.post('/getUnavailableSeats', (req, res) => {
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
 * Book flight updates row in db to add another seat to the taken seats 
 * used in: Payment.js
 */
router.post('/bookflight', (req, res) => {
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
 * getUserProfile gets users email 
 * used in: Payment.js
 */
router.post('/getUserEmail', (req, res) => {
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