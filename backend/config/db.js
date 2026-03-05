const mongoose = require("mongoose");
// const dns = require("node:dns/promises");
// dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error while connecting: ", error);
    process.exit(1);
  }
};

module.exports = connectToDB;
