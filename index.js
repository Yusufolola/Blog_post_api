const express = require("express")
const cors = require("cors")
require("dotenv").config()
const db = require("./config/db.js")


const app = express();

app.use(cors)



PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server listening on port ${PORT}`))
