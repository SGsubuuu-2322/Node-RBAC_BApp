const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./configs/dbConnect");
const authRoutes = require("./routes/authRoutes");

dbConnect();

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is successfully running at PORT ${PORT}`);
});
