const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const accountRoutes = require("./routes/accountRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const dataHandlerRoutes = require("./routes/dataHandlerRoutes");

app.use(bodyParser.json());

app.use("/accounts", accountRoutes);
app.use("/destinations", destinationRoutes);
app.use("/server", dataHandlerRoutes);

app.listen(port, () => {
  console.log(`Data Pusher API running at http://localhost:${port}`);
});
