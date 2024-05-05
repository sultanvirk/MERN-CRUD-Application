import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email:{
        type:String,
    },
    age:{
        type:String,
    }
})

const userModel = mongoose.model("users",userSchema);
export default userModel;