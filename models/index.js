const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@localhost:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  {
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/users/userModel")(sequelize, DataTypes);

module.exports = db;
