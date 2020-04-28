const utils = require("../db/utils");

// Liste des functions que l'on souhaite 
// rendre visible à l'exterieur du module
module.exports = {
  getAllUser,  // liste de toutes les taches pour un utilisateur
  getById, // liste des taches pour une liste by idliste
  saveById,
  update,
  deleteById,
  // saveColumnT, 
  // saveColumnF,
  // getColumn
};

// retourner la liste des tâches pour un user pour la page accueil
function getAllUser(Id_user, callback){
    
    let sqlQuery = "SELECT taches.titre, taches.date_tache, taches.note FROM taches, users, listes WHERE taches.date_tache is NOT NULL AND USERS.Id_user=$1 AND listes.Id_user=$1 AND listes.id_liste = taches.id_liste ORDER BY taches.date_tache LIMIT 100";
    utils.executeQuery(sqlQuery, [Id_user], (err, result) => {
      if (err) {
        callback(true, err);
      } else {
        callback(undefined, result.rows);
      }
    });
}




// retourner le détail d'une tâche 

function getById(id_tache, callback) {
  let sqlQuery = "select * from etapes, taches WHERE taches.id_tache = $1 AND taches.id_tache = etapes.id_tache";
  utils.executeQuery(sqlQuery, [id_tache], (err, result) => {
    if (err) {
      callback(true, err);
    }
    else if (result.rows.length === 0) {
      callback(true, `Impossible de retrouver la tache ${id_tache}`);
    }
    else {
      callback(undefined, result.rows);
    }
  });
}


//sauvegarder une tache 

function saveById({id_liste, titre}, callback) {
  const sql = "INSERT INTO taches (id_liste, titre) VALUES ($1, $2) RETURNING *";
  utils.executeQuery(sql, [id_liste, titre], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined, { id_tache: result.rows[0].id_tache});
      
    }
  });
}


// mettre à jour la colonne done en true
function saveColumnT(id_tache, callback) {
  const sql = "UPDATE taches SET done = true WHERE id_tache= $1";
  utils.executeQuery(sql, [id_tache], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined );
    }
  })
}

// mettre à jour la colonne done en false
function saveColumnF(id_tache, callback) {
  const sql = "UPDATE taches SET done = false WHERE id_tache= $1";
  utils.executeQuery(sql, [id_tache], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined );
    }
  })
}

// récupérer valeur de la colonne done
function getColumn(id_tache, callback) {
  const sql = "SELECT done FROM taches WHERE id_tache = $1";
  utils.executeQuery(sql, [id_tache], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined , result.rows);
    }
  })
}
//MAJ d'une tache dans une bd 

function update({ titre, date_tache, note, done, id_tache}, callback) {
  const sql = "UPDATE taches SET titre=$1, date_tache=$2, note=$3, done = $4 WHERE id_tache=$5 RETURNING *";
  utils.executeQuery(sql, [titre, date_tache, note,done, id_tache], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined, result.rows[0]);
    }
  });
}


// supprimer une tache 

function deleteById(id_tache, callback) {
  const sql = "DELETE FROM taches WHERE id_tache =$1";
  utils.executeQuery(sql, [id_tache], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined);
    }
  });
}