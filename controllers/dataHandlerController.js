const Destination = require("../models/destination");
const Account = require("../models/account");

// Create Destination
exports.createDestination = async (req, res) => {
  try {
    const { accountId, url, httpMethod, headers } = req.body;
    const account = await Account.findByPk(accountId);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    const destination = await Destination.create({
      accountId,
      url,
      httpMethod,
      headers
    });
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List All Destinations
exports.getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.findAll();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Destinations by AccountId
exports.getDestinationsByAccountId = async (req, res) => {
  try {
    const destinations = await Destination.findAll({
      where: { accountId: req.params.accountId }
    });
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Destination
exports.updateDestination = async (req, res) => {
  try {
    const { url, httpMethod, headers } = req.body;
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    destination.url = url || destination.url;
    destination.httpMethod = httpMethod || destination.httpMethod;
    destination.headers = headers || destination.headers;
    await destination.save();
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Destination
exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    await destination.destroy();
    res.json({ message: "Destination deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
