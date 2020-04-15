const utils = require("../db/utils");


module.exports = {
  getAll,
  getById,
  save,
  update,
  deleteById
};

// retourner la liste des tâches 
function getAll(sortBy, callback){
    switch(sortBy){

        case "id_desc" : 
            orderByString = "id DESC";
            break;

            default:
            orderByString = "created_at ASC";
            break;

    }


  
    let sqlQuery = `SELECT taches.titre, taches.date_tache, taches.note 
                    FROM taches, users, listes 
                    WHERE users.Id_user=$liste.Id_user
                    AND listes.id_liste=$taches.id_liste
                    AND taches.date_tache is NOT NULL
                    ORDER BY ${orderByString} LIMIT 100`
    utils.executeQuery(sqlQuery, [req.session.userId], (err, result) => {
      if (err) {
        callback(true, err);
      } else {
        callback(undefined, result.rows);
      }
    });
}



// retourner le détail d'une tâche 

function getById(tacheId, callback) {
  utils.executeQuery("SELECT * FROM taches WHERE id=$1", [tacheId], (err, result) => {
    if (err) {
      callback(true, err);
    }
    else if (result.rows.length === 0) {
      callback(true, `Impossible de retrouver le projet ${tacheId}`);
    }
    else {
      callback(undefined, result.rows[0]);
    }
  });
}


//sauvegarder une tache 

function save({titre, date_tache, note}, callback) {
  const sql = "INSERT INTO tache (titre, date, note) VALUES ($1, $2, $3) RETURNING *";
  utils.executeQuery(sql, [titre, date_tache, note], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined, { tacheId: result.rows[0].id_tache});
    }
  });
}

//MAJ d'un projet dans une bd 

function update({ id, name, description }, callback) {
  const sql = "UPDATE taches SET titre=$1, date=$2, note=$3 WHERE id_tache=$4 RETURNING *";
  utils.executeQuery(sql, [titre, date_tache, note], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined, result.rows[0]);
    }
  });
}


// supprimer une tache 

function deleteById(tacheId, callback) {
  const sql = "DELETE FROM taches WHERE id=$1";
  utils.executeQuery(sql, [tacheId], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined);
    }
  });
}