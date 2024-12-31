const express = require("express")
const cors = require("cors")
require("dotenv").config()
const db = require("./config/db.js")
const userRoute = require("./routes/userRoute/userRoute.js")
const commentRoute = require("./routes/commentRoute/commentRoute.js")
const postRoute = require("./routes/postRoute/postRoute.js")
const categoryRoute = require("./routes/categoryRoute/categoryRoute.js")
const { errorMiddleware,notfound  } = require("./middlewares/errorMiddleware")
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors({
    origin: 'http://localhost:5000', 
    credentials: true, 
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/api/v1/users", userRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/posts", postRoute);

app.use(notfound);
app.use(errorMiddleware);


const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`server listening on port ${PORT}`))
