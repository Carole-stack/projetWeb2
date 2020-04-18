const utils = require("../db/utils");

// Liste des functions que l'on souhaite 
// rendre visible à l'exterieur du module
module.exports = {
  getAllIndex,
  getAllListe,
  getById,
  save,
  update,
  deleteById
};

// retourner la liste des tâches pour un user pour la page accueil
function getAllIndex(Id_user, callback){
  

    let sqlQuery = "SELECT taches.titre, taches.date_tache, taches.note FROM taches, users, listes WHERE taches.date_tache is NOT NULL AND users.Id_user=$1 AND listes.Id_user=$1 AND listes.id_listes = taches.id_liste ORDER BY taches.date_taches LIMIT 100";
    utils.executeQuery(sqlQuery, [Id_user], (err, result) => {
      if (err) {
        callback(true, err);
      } else {
        callback(undefined, result.rows);
      }
    });
}

// retourner la liste des tâches pour une liste dans page d'édition de liste
function getAllListe(liste_id, callback){
    
  let sql = "SELECT taches.titre, taches.date_tache, taches.note FROM taches, listes WHERE listes.id_liste=$1  AND listes.id_listes = taches.id_liste ORDER BY taches.id_tachesLIMIT 100";
  utils.executeQuery(sql, [liste_id], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined, result.rows[0]);
    }
    
  });
}



// retourner le détail d'une tâche 

function getById(tacheId, callback) {
  utils.executeQuery("SELECT * FROM taches WHERE id_tache=$1 AND ", [tacheId], (err, result) => {
    if (err) {
      callback(true, err);
    }
    else if (result.rows.length === 0) {
      callback(true, `Impossible de retrouver la tache ${tacheId}`);
    }
    else {
      callback(undefined, result.rows[0]);
    }
  });
}


//sauvegarder une tache 

function save({id_liste, titre, date_tache, note}, callback) {
  const sql = "INSERT INTO tache (id_liste, titre, date, note) VALUES ($1, $2, $3, $4) RETURNING *";
  utils.executeQuery(sql, [id_liste, titre, date_tache, note], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined, { id_tache: result.rows[0].id_tache});
    }
  });
}

//MAJ d'une tache dans une bd 

function update({id_tache, date_tache, titre, note}, callback) {
  const sql = "UPDATE taches SET titre=$1, date=$2, note=$3 WHERE id_tache=$4 RETURNING *";
  utils.executeQuery(sql, [id_tache, titre, date_tache, note], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined, result.rows[0]);
    }
  });
}


// supprimer une tache 

function deleteById(id_tache, callback) {
  const sql = "DELETE FROM taches WHERE id=$1";
  utils.executeQuery(sql, [id_tache], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined);
    }
  });
}