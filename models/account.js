const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Account = sequelize.define("Account", {
  accountId: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  accountName: { type: DataTypes.STRING, allowNull: false },
  appSecretToken: { type: DataTypes.STRING, allowNull: false },
  website: { type: DataTypes.STRING }
});

module.exports = Account;
