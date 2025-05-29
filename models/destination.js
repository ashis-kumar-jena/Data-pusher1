const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const Account = require("./account");

const Destination = sequelize.define("Destination", {
  url: { type: DataTypes.STRING, allowNull: false },
  httpMethod: { type: DataTypes.STRING, allowNull: false },
  headers: { type: DataTypes.JSON, allowNull: false }
});

Destination.belongsTo(Account, { onDelete: "CASCADE" });
Account.hasMany(Destination);

module.exports = Destination;
