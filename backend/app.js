require('dotenv').config()
const express = require("express")
const dbConnection = require('./db/db_conn')
const cookie = require("cookie-parser")
const cors = require("cors")
const app  = express()
const port = process.env.PORT  

dbConnection()

app.use(cors ({
    origin:[ process.env.FRONTEND_URL ],
    credentials:true,
}))
app.use(express.json()) 
app.use(cookie())
app.use(require('./routes/userRouter'))


app.listen(port,()=>{
    console.log(`app listining on port no ${port}`)
})