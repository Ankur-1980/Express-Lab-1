const { Pool } = require("pg");
const credentials = new Pool({
  user: "postgres",
  password: "Kartika1986",
  host: "localhost",
  port: 5432,
  database: "ExpressShopDB",
  ssl: false,
});
module.exports = credentials;
