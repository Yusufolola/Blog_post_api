const express = require("express")
const cors = require("cors")
require("dotenv").config()
const db = require("./config/db.js")
const userRoute = require("./routes/userRoute/userRoute.js")
const commentRoute = require("./routes/commentRoute/commentRoute.js")
const postRoute = require("./routes/postRoute/postRoute.js")
const categoryRoute = require("./routes/categoryRoute/categoryRoute.js")


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/users", userRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/posts", postRoute);



const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server listening on port ${PORT}`))
