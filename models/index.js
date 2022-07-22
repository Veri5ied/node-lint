const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  `postgres://xfqeuwougejjye:e457a9f28bc1117d8d58b62b2706784f7bf33ca8023a87b063c4e9a5875f3cc6@ec2-44-206-214-233.compute-1.amazonaws.com:5432/dfdgi89d9ga5jn`,
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
