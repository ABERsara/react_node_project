require("dotenv").config()
const express=require("express")
const cors=require("cors")
const connectDB=require("./config/dbConn")

const corsOptions=require("./config/corsOptions")
const { default: mongoose } = require("mongoose")

const PORT=process.env.PORT||7001
const app=express()
connectDB()
//middleware 
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

//router
app.get("/",(req,res)=>{
    res.send("THis is the home page")})

app.use("/api/users",require("./routes/userRouter"))
app.use("/api/posts",require("./routes/postRouter"))
app.use("/api/photos",require("./routes/photoRouter"))
app.use("/api/todos",require("./routes/todoRouter"))
//check the connection and run only if it success
mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB')
    app.listen(PORT,()=>{
      console.log(`server runing on PORT ${PORT}`)})
})

mongoose.connection.on('error',err=>{
    console.log(err)
})

