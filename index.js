const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Item = require("./models/Item");

const app = express();
const PORT = 3000;
const DB_URL = "mongodb://127.0.0.1:27017/myprojectdb";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/add", async (req, res) => {
  try {
    const item = await new Item(req.body).save();
    res.status(201).send("Record saved successfully");
  } catch (err) {
    res.status(500).send("Error saving record");
  }
});

app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).send("Error fetching records");
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
