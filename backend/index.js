import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoutes from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// middleware for parsing request body in JSON
app.use(express.json());

// middleware for handling cors policy

// Option 1: Allow ALL Origins with default of cors(*)
// app.use(cors());

// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// go to the homepage
app.get("/", (req, res) => {
  console.log(req);

  return res.status(234).send("Welcome to this MERN Stack Tutorial");
});

// express router middleware
app.use("/books", booksRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
