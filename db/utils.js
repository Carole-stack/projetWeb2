const utils = {};
const { Pool } = require("pg");

// Inialisation de la connexion
const pool = new Pool({
    user: "xnkxcdqr",
    host: "kandula.db.elephantsql.com",
    database: "xnkxcdqr",
    password: "ou9NlWeRyAh0lfpuKWy_d7zx9RjpX5sJ",
    port: 5432
  });
  
  utils.executeQuery = (sql, params, callback) => {
    pool.query(sql, params, callback);
  };
  
  module.exports = utils;