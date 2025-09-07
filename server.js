const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server chal raha hai Usman bhai 🚀");
});

app.get("/scores", (req, res) => {
  let scores = [];
  if (fs.existsSync("scores.json")) {
    scores = JSON.parse(fs.readFileSync("scores.json"));
  }
  res.json(scores);
});

// ✅ Naya route: score save karna
app.post("/save-score", (req, res) => {
  const { name, score } = req.body;

  // Pehle purane scores read karo
  let scores = [];
  if (fs.existsSync("scores.json")) {
    scores = JSON.parse(fs.readFileSync("scores.json"));
  }

  // Naya score object banao
  const newScore = {
    name,
    score,
    date: new Date().toLocaleString()
  };

  // Naya score add karo
  scores.push(newScore);

  // File me save karo
  fs.writeFileSync("scores.json", JSON.stringify(scores, null, 2));

  res.json({ message: "Score save ho gaya ✅", newScore });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

