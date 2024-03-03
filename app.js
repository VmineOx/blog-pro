const express = require("express");
const connectToDb = require("./config/connectToDb")
require("dotenv").config();

//Connection to Database
connectToDb();

// Init App
const app = express();

//middlewares
app.use(express.json());

//Routes
app.use("/api/auth",require("./routes/authRoute"));
app.use("/api/users",require("./routes/usersRoute"));
app.use("/api/posts",require("./routes/postRoute"));


//Running The Server
const PORT = process.env.PORT || 9000;
app.listen(PORT,() => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))