const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Item = require("./Models/items.model.js");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node API!");
});

app.get("/items", async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ messsage: error.message });
  }
});

app.get('/items/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const item = await Item.findById(id);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

app.post("/items", async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://towkirwebdeveloper:JwpmgT1Wtbgbds4E@cluster0.pm0p0t4.mongodb.net/simple-crud-app?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("database connected!");
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
