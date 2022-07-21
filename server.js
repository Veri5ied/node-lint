const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

//
const db = require("./models");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 8080;

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ force: true }).then(() => {
  console.log("Database connected successfully");
});

//app routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
