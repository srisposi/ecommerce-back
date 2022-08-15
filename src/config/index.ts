require("dotenv").config();

let config = {
  port: process.env.PORT,
  cors: process.env.CORS,
};

module.exports = { config };
