const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();


app.use( cors());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password1",
  database: ensf_614
})

app.post('/login', (req,res) => {
  const sql = "SELECT * FROM USERTABLE WHERE USER = ? and PASSWORD = ?"
  const values = [
    req.body.user,
    req.bosy.password
  ]
  db.query(sql, [values], (err, data) => {
    if(err) return res.json("Login Failed");
    return res.json(data);
  })
})


app.listen(8081, () =>{
  console.log("Listening...")
})







/*
const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/",cors(),(req,res)=>{

})


app.post("/sendData",async(req,res)=>{
    const{user, password}=req.body
   

    try{
        await collection.insertMany([{user:user, password:password}])

        const allData=await collection.find({})

        //res.json(allData)
    }
    catch(e){
        res.json("fail")
        console.log(e)
    }
})

// app.post("/login", (re,res)=> {
//     const {user, password} = req.body
// })

// app.get("/login", async(req,res)=>{
//     const cursor = db.collection('backend-to-frontend').find({ Name: 'Bob' })
//     const values = [
//         req.body.user db.collection
        
//     ]
    
// })

app.get('/api/user/:username', async (req, res) => {
    const username = req.params.username;
  
    try {
      // Query MongoDB to find the user based on the username
      const user = await UserModel.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(8000,()=>{
    console.log("port connected");
})
*/