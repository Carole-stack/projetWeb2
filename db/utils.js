const utils = {};
const config = require("../config.js");
const { Pool } = require("pg");

// Inialisation de la connexion
const pool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.database,
  password: config.database.password,
  port: config.database.port
});





// Inialisation de la connexion ancienne méthode
// const pool = new Pool({
//     user: "xnkxcdqr",
//     host: "kandula.db.elephantsql.com",
//     database: "xnkxcdqr",
//     password: "ou9NlWeRyAh0lfpuKWy_d7zx9RjpX5sJ",
//     port: 5432
//   });
  
  utils.executeQuery = (sql, params, callback) => {
    pool.query(sql, params, callback);
  };
  
  module.exports = utils;