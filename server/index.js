import express from "express"
import connectToMongo from "./config/db.js";
import userRoutes  from "./routes/user_routes.js"
import cors from 'cors';
const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 8000;
connectToMongo();
app.get("/", (req,res)=>{
    res.send("Api is running")
})


// routers
app.use("/api/v1", userRoutes)



app.listen(PORT, ()=>{
    console.log(`App is running at PORT = ${PORT}`)
})