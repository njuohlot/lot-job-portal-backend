const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv").config();
const db_connect = require('./database/db');
const morgan = require('morgan');
const userRouter = require("./routes/UserRoute.js");
const jobRouter = require("./routes/jobRoute.js");
const categoryRouter = require("./routes/categoryRoute.js");


const app = express();

//middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hackers know about our stack

// routes
app.use("/api/users", userRouter);
app.use("/api/myjobs", jobRouter);
app.use("/api/category", categoryRouter);
//connect-db
db_connect();
//conneting server
const port = process.env.PORT || 4000;

app.listen(port, () =>{
    console.log(`Server connected success with port ${port}`);
})