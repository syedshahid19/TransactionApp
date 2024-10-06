const express = require("express");
const app = express();
const {dbConnect} = require("./config/database");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/User");
const authRoutes = require("./routes/googleUser");
const session = require('express-session');
var cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

app.post('/set-account-type', (req, res) => {
    const { accountType } = req.body;
    // Store the accountType in the session (or JWT or encrypted cookie)
    req.session.accountType = accountType;
    res.status(200).json({ message: "Account type set successfully" });
  });

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET 
}));

dbConnect();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", userRoutes);
app.use("/", authRoutes)


app.listen(PORT, ()=>{
    console.log(`Server started successfully at ${PORT}`);
});