import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./route/book.route.js"
import cors from "cors"
import userRoute from "./route/user.route.js"

const app = express()

app.use(cors())
app.use(express.json())
 dotenv.config()


const PORT=process.env.PORT || 4000
const URI = process.env.MongodbURI

try{
  mongoose.connect(URI,{
    useNewUrlparser:true,
    useUnifiedTopology:true
  })
  console.log("connect to mongodb")

  }  catch (error){
    console.log("Error:",error)
}

//defining routes
app.use(express.json());

// defining routes
app.use("/book", bookRoute);   // 👈 yaha use() lagao, listen() nahi
app.use("/user",userRoute)
// start server
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
