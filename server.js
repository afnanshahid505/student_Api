const express = require("express");
const app = express();
const studentRoutes= require("./routes/studentroutes");
app.use(express.json())
app.use("/students", studentRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});