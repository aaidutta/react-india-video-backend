const express = require("express");
const app = express();
const port = 8000;
const fs = require("fs");
const path = require("path");
const cors = require("cors");

app.use(cors());

// Define a route to return the JSON data
app.get("/", (req, res) => {
  // Read the JSON file
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const fileName = `data_${month}_${day}.json`;
  const filePath = path.join("dumps", fileName);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);
      // Send the JSON response
      res.json(jsonData);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).json({ error: "Error parsing JSON data" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
