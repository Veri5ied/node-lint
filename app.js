import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/error-handler.js";
import sampleRoute from "./routes/sample-route.js";
const app = express();
dotenv.config();

//middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/v1/sample", sampleRoute);
app.use(errorHandler);

const port = process.env.PORT || 4000;

const start = () => {
  try {
    //import db connection function here
    app.listen(port, () => {
      console.log(`Everything soft on port ${port}`);
    });
    //log the db connection status
  } catch (err) {
    console.log(err);
  }
};

start();
