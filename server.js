const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let slots = { s1: 1, s2: 1, s3: 1 };

// ESP updates this
app.post("/update", (req, res) => {
  slots = req.body;
  res.send("OK");
});

// Frontend reads this
app.get("/data", (req, res) => {
  // Mapping logic (you decide meaning)

  let busVacant = slots.s1 ? 3 : 2;
  let miniVacant = slots.s2 ? 3 : 2;
  let carVacant = slots.s3 ? 3 : 2;

  res.json({
    bus: busVacant,
    mini: miniVacant,
    car: carVacant,
    raw: slots
  });
});

app.listen(3000, () => console.log("Server running"));
