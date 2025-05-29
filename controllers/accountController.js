const Account = require("../models/account");
const { v4: uuidv4 } = require("uuid");

// Create Account
exports.createAccount = async (req, res) => {
  try {
    const { email, accountName, website } = req.body;
    const account = await Account.create({
      accountId: uuidv4(),
      email,
      accountName,
      appSecretToken: uuidv4(),
      website
    });
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// List All Accounts
exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Account
exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Account
exports.updateAccount = async (req, res) => {
  try {
    const { accountName, website } = req.body;
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    account.accountName = accountName || account.accountName;
    account.website = website || account.website;
    await account.save();
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Account
exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    await account.destroy();
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
