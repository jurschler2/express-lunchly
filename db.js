/** Database for lunchly */

const pg = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///lunchly-test";
} else {
  DB_URI = "postgresql:///lunchly";
}

const db = new pg.Client({connectionString: DB_URI});

db.connect();

module.exports = db;
