const utils = require("./utils");
const fs = require("fs");

// Import du fichier avec les commandes SQL
const dbFilePath = `${__dirname}/populate.sql`;
const sql = fs.readFileSync(dbFilePath).toString();

// Execution des commandes SQL
utils.query(sql, [], (err, res) => {
  if (err) {
    console.log(res);
  } else {
    console.log("Import terminé avec succès");
  }
});

