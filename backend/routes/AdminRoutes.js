const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Authentication routes with app. change to router.


/**
 * get all aircraft IDs and models
 * used mostly for populating dropdown lists
 * used in: AddFlightForm.js, DeleteAircraftForm.js, FlightForm.js, EditFlightForm.js where flights are added to system
 */
router.post('/getAircraftIDs', (req, res) => {
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
 * addFlight inserts new flight in database
 * used in: AddFlightForm.js
 */
router.post('/addFlight', (req, res) => {
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
 * Insert new crew member to database
 * used in AddCrewForm.js
 */
router.post('/addNewCrew', (req, res) => {
    const sql = "INSERT INTO tblCrew (FNAME, LNAME, POSITION) VALUES(?, ?, ?)"
   
    db.query(sql, [req.body.fname, req.body.lname, req.body.position], (err, data) => {
        
        console.log("SQL Query:", sql); // Log the SQL query
        if(err){
            return res.json("Error");
         }
        return res.json();
        
    })
})

/**
 * Insert new aircraft to database
 * used in: AddAircraftForm.js
 */
router.post('/addAircraft', (req, res) => {
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
 * Delete aircraft from database
 * used in: DeleteAircraftForm.js
 */
router.post('/removeAircraft', (req, res) => {
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
 * getCrewByName gets crew members where first and last name match
 * used in: EditCrewForm.js
 */
router.post('/getCrewByName', (req, res) => {
    
    const sql = "SELECT crewid, fname, lname, position FROM tblCrew WHERE fname = ? and lname = ?"
    db.query(sql, [req.body.fname, req.body.lname], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
       
        res.status(200).json({ crew: data });
    })
})


/**
 * overwriteCrewByCrewId overwrite crew member data where id matches
 * used in: EditCrewForm.js
 */
router.post('/overwriteCrewByCrewId', (req, res) => {
    const { crewid, fname, lname, position } = req.body;
    const sql = "UPDATE tblCrew SET FNAME = ?, LNAME = ?, POSITION = ? WHERE CREWID = ?;"

    console.log("selected crew id: ", req.body.crewid)
    db.query(sql, [fname, lname, position, crewid], (err, data) => {
        if (err) {
             console.error('Error couldn\'t find flight:', err);
             return res.status(500).json({ error: 'Internal Server Error' });
        } else {
             return res.json("Success")
        }
      })
 })


 /**
 * deleteCrewByCrewId deletes crew member by id
 * used in: EditCrewForm.js
 */
 router.post('/deleteCrewByCrewId', (req, res) => {
    const sql = "DELETE FROM tblCrew where CREWID = ?"
    
    db.query(sql, [req.body.crewid],(err, data) => {
        console.log("SQL Query:", req.body.crewid); // Log the SQL query
        if (err) {
            console.error('Error deleting crew member:', err);
            return res.status(500).json({ error: "Internal Server Error" });
        } else {

            return res.json("Success") 
        }
           
    })
})


/**
* getFlightByFlightID searches for flight by flightID
* used in: EditFlightForm.js
*/
router.post('/getFlightByFlightID', (req, res) => {
  
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
 * overwriteFlightsByFlightID overwrites flight data based on flightID
 * used in: EditFlightForm.js
 */
router.post('/overwriteFlightsByFlightID', (req, res) => {
    const { destination, origin, departureTime, landingTime, flightID, aircraftid } = req.body;
    const sql = "UPDATE tblFlight SET ORIGIN = ?, DESTINATION = ?, DEPARTURETIME = ?, ARRIVALTIME = ?, AIRPLANEID = ? WHERE FLIGHTID = ?;"

    console.log("selected FlightID: ", req.body.flightID)
    db.query(sql, [origin, destination, departureTime, landingTime, aircraftid, flightID], (err, data) => {
        if (err) {
             console.error('Error couldn\'t find flight:', err);
             return res.status(500).json({ error: 'Internal Server Error' });
        } else {
             return res.json("Success")
        }
      })
 })


/**
 * deleteFlightByFlightId deletes flight by flightid
 * used in: EditFlightForm.js
 */
router.post('/deleteFlightByFlightId', (req, res) => {
    const sql = "DELETE FROM tblFlight where FLIGHTID = ?"
    
    db.query(sql, [req.body.flightID],(err, data) => {
        console.log("SQL Query:", sql, "\n PASSES FLIGHTID:", req.body.flightID); // Log the SQL query
        if (err) {
            console.error('Error deleting crew member:', err);
            return res.status(500).json({ error: "Internal Server Error" });
        } else {

            return res.json("Success") 
        }
           
    })
})



/**
 * getCrew gets crewid and first name for all crew members
 * used in: EditCrewAssignment.js
 */
router.post('/getCrew', (req, res) => {
    console.log()
    const sql = "SELECT CREWID, FNAME FROM tblCrew"
    
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
 * getAssignedCrew gets crew id and names for a given flight
 * used in: EditCrewAssignment.js
 */
router.post('/getAssignedCrew', (req, res) => {
    console.log(req.body.selectedFlightID)
    const sql = "SELECT tblCrew.CREWID, tblCrew.FNAME FROM tblCrew LEFT JOIN tblAssignedCrew on tblCrew.CREWID = tblAssignedCrew.CREWID WHERE tblAssignedCrew.FLIGHTID = ?"
    
    db.query(sql, [req.body.selectedFlightID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
        const combinedCrewString = data.map(row => row.FNAME).join(', ');
        const resultArray = [{ Name: combinedCrewString }];
       
        res.status(200).json({ crew: data });
    })
})


/**
 * updateCrew deletes assigned crew and reassigns new crew members
 * used in: EditCrewAssignment.js
 */
router.post('/updateCrew', async (req, res) => {
    const { selectedFlightID, updatedCrew } = req.body;
    
 
    // Assuming you have a table named CREW in your database
    const deleteQuery = 'DELETE FROM tblAssignedCrew WHERE FLIGHTID = ?';
    const insertQuery = 'INSERT INTO tblAssignedCrew (FLIGHTID, CREWID) VALUES (?, ?)';
  
    try {
      // Delete all existing crew records for the given FLIGHTID
        db.query(deleteQuery, [selectedFlightID]);
  
      // Insert the updated crew data
      
      for (const crew of updatedCrew) {
        const { CREWID, FNAME } = crew;
        db.query(insertQuery, [selectedFlightID, CREWID]);
        
      }
  
      // Send a success response
      res.status(200).json({ message: 'Crew updated successfully' });
    } catch (error) {
      console.error('Error updating crew:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });



return router;
};