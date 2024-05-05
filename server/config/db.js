import mongoose from "mongoose";

const connectToMongo = ()=>{
    try{
       const res =   mongoose.connect("mongodb://localhost:27017/mern-crud")
       if(res){
        console.log("Connected to database successfully")
       }
    }catch(error){
        console.log(`error in connection = ${error}`)
    }
}

export default connectToMongo;