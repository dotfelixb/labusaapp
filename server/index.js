/**
 * LabUsa Web Api Server
 */
require('dotenv').config()
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const logRoutes = require("./routes/log");

const app = express()
const port = 3001

// middleware
app.use(cors());
app.use(express.json());

// route middleware
app.use("/api/auth", authRoutes);
app.use("/api/logs", logRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server App listening at http://localhost:${port}`)
})