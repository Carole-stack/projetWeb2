const utils = {};
const { Pool } = require("pg");

// Inialisation de la connexion
const pool = new Pool({
  user: "vqksoenb",
  host: "kandula.db.elephantsql.com",
  database: "vqksoenb",
  password: "J6C3JLc1qhGJUtzT7Cn_VooshSYwmqPb",
  port: 5432

});
  
  utils.executeQuery = (sql, params, callback) => {
    pool.query(sql, params, callback);
  };
  
  module.exports = utils;