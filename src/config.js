// config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT || 3000,
    node_env: process.env.NODE_ENV || "development",
    apiURL: process.env.API_URL,
    publicKey: process.env.API_PUBLIC_KEY,
    privateKey: process.env.API_PRIVATE_KEY
};