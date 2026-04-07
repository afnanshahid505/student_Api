const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const studentRoutes = require("./routes/studentroutes");

app.use(express.json());
app.use("/students", studentRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000");
});