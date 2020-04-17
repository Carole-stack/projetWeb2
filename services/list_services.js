const utils = require("../db/utils");

module.exports = {
    save,
    deleteById
  };

  function deleteById(id_liste, callback) {
    const query = "DELETE FROM listes WHERE id=$1";
    utils.executeQuery(query, [id_liste], (err, result) => {
      if (err) {
        callback(true, err);
      } else {
        callback(undefined);
      }
    });
  }

  function save({ Id_user, name}, callback) {
    const query = "INSERT INTO listes (Id_user, name) VALUES ($1, $2) RETURNING *";
    utils.executeQuery(query, [Id_user, name], (err, result) => {
      if (err) {
        callback(true, err);
      } else {
        callback(undefined);
      }
    });
  }