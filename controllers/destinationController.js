const Account = require("../models/account");
const Destination = require("../models/destination");
const axios = require("axios");

exports.receiveData = async (req, res) => {
  try {
    const token = req.headers["cl-x-token"];
    if (!token) {
      return res.status(401).json({ error: "Un Authenticate" });
    }

    const account = await Account.findOne({ where: { appSecretToken: token } });
    if (!account) {
      return res.status(401).json({ error: "Invalid Token" });
    }

    const data = req.body;

    if (typeof data !== "object") {
      return res.status(400).json({ error: "Invalid Data" });
    }

    const destinations = await Destination.findAll({
      where: { accountId: account.accountId }
    });

    const promises = destinations.map((dest) => {
      const headers = JSON.parse(dest.headers);
      if (dest.httpMethod.toLowerCase() === "get") {
        return axios.get(dest.url, {
          headers,
          params: data
        });
      } else if (
        dest.httpMethod.toLowerCase() === "post" ||
        dest.httpMethod.toLowerCase() === "put"
      ) {
        return axios({
          method: dest.httpMethod,
          url: dest.url,
          headers,
          data
        });
      }
    });

    await Promise.all(promises);

    res.json({ message: "Data sent to all destinations" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
