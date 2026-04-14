const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// Sensor values (default = empty)
let sensors = { s1: 1, s2: 1, s3: 1 };

// UPDATE from ESP / manual testing
app.post("/update", (req, res) => {
  const { s1, s2, s3 } = req.body;

  // update only if values exist
  if (s1 !== undefined) sensors.s1 = s1;
  if (s2 !== undefined) sensors.s2 = s2;
  if (s3 !== undefined) sensors.s3 = s3;

  console.log("Updated sensors:", sensors);

  res.send("OK");
});

// DATA for frontend
app.get("/data", (req, res) => {

  let slots = {
    P1: 1, P2: 1, P3: 1,
    P4: 1, P5: 1, P6: 1,
    P7: 1, P8: 1
  };

  // ✅ ONLY REAL SENSORS (UPDATED MAPPING)
  slots.P2 = sensors.s1; // Car
  slots.P5 = sensors.s2; // Mini Bus
  slots.P8 = sensors.s3; // Bus

  res.json(slots);
});

app.listen(3000, () => console.log("Server running on port 3000"));
