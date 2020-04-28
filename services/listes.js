const utils = require("../db/utils");

module.exports = {
    get,
    save,
    deleteById,
    getById
  };


// foncion qui affiche renvoie la liste des listes pour un utilisateur 
function get(Id_user, callback) {
  const query = "SELECT * FROM listes WHERE id_user = $1";
  utils.executeQuery(query, [Id_user], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined, result.rows);
    }
  });
}


// retourner la liste des tâches pour une liste dans page d'édition de liste
function getById(id_liste, callback){
    
  let sql = "SELECT * FROM taches, listes WHERE listes.id_liste=$1  AND listes.id_liste = taches.id_liste ORDER BY taches.date_tache";
  utils.executeQuery(sql, [id_liste], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined, result.rows);
    }
    
  });
}
// fonction qui permet de supprimer la liste depuis la page edition de liste/tache
  function deleteById(id_liste, callback) {
    const query = "DELETE FROM listes WHERE id_liste=$1";
    utils.executeQuery(query, [id_liste], (err, result) => {
      if (err) {
        callback(true, err);
      } else {
        callback(undefined);
      }
    });
  }
// fonction qui permet de créer une liste dans la base de données pour un utilisateur
  function save({ Id_user, name}, callback) {
    const query = "INSERT INTO listes (Id_user, name) VALUES ($1, $2) RETURNING *";
    utils.executeQuery(query, [Id_user, name], (err, result) => {
      if (err) {
        callback(true, err);
      } else {
        callback(undefined, { nameListe: result.rows[0].name });
      }
    });
  }