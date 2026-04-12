const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// Real sensor values
let sensors = { s1: 1, s2: 1, s3: 1 };

// ESP will send updates here
app.post("/update", (req, res) => {
  sensors = req.body;
  res.send("OK");
});

// Frontend fetches this
app.get("/data", (req, res) => {

  let slots = {
    P1: 1, P2: 1, P3: 1, P4: 1,
    P5: 1, P6: 1, P7: 1, P8: 1,
    P9: 1, P10: 1, P11: 1, P12: 1
  };

  // Map real sensors
  slots.P1 = sensors.s1;
  slots.P6 = sensors.s2;
  slots.P10 = sensors.s3;

  res.json(slots);
});

app.listen(3000, () => console.log("Server running"));
