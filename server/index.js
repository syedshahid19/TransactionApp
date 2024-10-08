const express = require("express");
const app = express();
const { dbConnect } = require("./config/database");
const transactionRoutes = require("./routes/Transaction");
var cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// https://transaction-app-ochre.vercel.app
// http://localhost:3000

app.use(
  cors({
    origin: "https://transaction-app-ochre.vercel.app",
    credentials: true,
  })
);


dbConnect();

app.use(express.json());


app.use("/api/v1", transactionRoutes);


app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});
