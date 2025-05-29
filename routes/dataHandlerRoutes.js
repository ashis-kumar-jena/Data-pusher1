const express = require("express");
const router = express.Router();
const dataHandlerController = require("../controllers/dataHandlerController");

router.post("/", dataHandlerController.receiveData);

module.exports = router;
