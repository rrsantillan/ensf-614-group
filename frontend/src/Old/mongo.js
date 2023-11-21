/*
const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/backend-to-frontend")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=> {
    console.log('failed');
})

const newSchema=new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

const collection = mongoose.model("collection",newSchema)

module.exports=collection

*/