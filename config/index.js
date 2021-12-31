require('dotenv').config();

module.exports = {
  AZURE_USERNAME: process.env.AZURE_USERNAME,
  AZURE_PASSWORD: process.env.AZURE_PASSWORD,
  SESSION_SECRET: process.env.SESSION_SECRET
};
