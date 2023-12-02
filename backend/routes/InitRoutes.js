const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Authentication routes with app. change to router.

/**
 * signUp which adds (new user) row to user table
 * Used in: Signup.js
 */
router.post('/signup', (req, res) => {
    
    const sql = "INSERT INTO TBLUSER (USERID, USERNAME, PASSWORD, PROFILE, EMAIL, YEARLYPROMO, PROMOCODE) VALUES (?, ?, ?, ?, ?, ?, ?)"
    
    const values = [
        req.body.user,
        req.body.password,
        req.body.email
    ]
    console.log(values)
    db.query(sql,  ['0', req.body.user, req.body.password, 'REGUSER', req.body.email, '0', '50OFF'], (err, data) => {
        console.log("SQL:", sql);
        if(err){
            return res.json("Error");
        } else{
            console.log("Writing new registered user info to DB...")
        }
        return res.json(data);
     
    })
});


/**
 * login ensures the user is part of the system
 * returns userdata where exisiting username and password entered
 * Used in: Login.js
 */
router.post('/login', (req, res) => {
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

return router;
};