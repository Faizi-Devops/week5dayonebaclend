const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require("cors");

const todo = require("./routes/Todo");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/todo", todo);
const port = 4000;

const DATABASE_URL = process.env.DATABASE_URL;
// connectDB(DATABASE_URL);
try {
   mongoose.connect(DATABASE_URL);
  console.log("Database connected successfully...");
} catch (error) {
  throw new Error("Error connecting to the database:", error);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
