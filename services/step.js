const utils = require("../db/utils");
// Liste des functions que l'on souhaite 
// rendre visible à l'exterieur du module
module.exports = { 
    save,
    update,
    deleteById, 
    // getColumn, 
    // saveColumnT,
    // saveColumnF

}
// fonction qui permet d'enregistrer une etape en BD
  function save({id_tache, label}, callback) {
      const sql = "INSERT INTO etapes (id_tache, label) VALUES ($1, $2) RETURNING *";
      utils.executeQuery(sql, [id_tache, label], (err, result) => {
        if (err) {
            callback(true, err);
          } else {
            callback(undefined, { id_etape: result.rows[0].id_etape});
          }
      });
  }

  function deleteById(id_etape, callback) {
    const sql = "DELETE FROM etapes WHERE id_etape =$1 ";
    utils.executeQuery(sql, [id_etape], (err, result) => {
      if (err) {
        callback(true, err);
      } else {
        callback(undefined);
      }
    });
  }

  // mettre a jour une etape en BD
  function update({label, coche,  id_etape}, callback) {
        const sql = "UPDATE etapes SET label = $1, coche = $2 WHERE id_etape = $3 RETURNING *";
        utils.executeQuery(sql, [label, coche, id_etape], (err, result) => {
            if (err) {
                callback(true, err);
              } else {
                callback(undefined, result.rows[0]);
              }
        });
  }

//   // metmet de récupérer la valeur de la colonne coche d'une étape
//   function getColumn(id_etape, callback) {
//     const sql = "SELECT coche FROM etapes WHERE id_etape = $1";
//     utils.executeQuery(sql, [id_etape], (err, result) => {
//       if (err) {
//         callback(true, err);
//       } else {
//         callback(undefined , result.rows);
//       }
//     });
//   };

//   // mettre à jour la colonne coche en true
// function saveColumnT(id_etape, callback) {
//   const sql = "UPDATE etapes SET coche = true WHERE id_etape = $1";
//   utils.executeQuery(sql, [id_etape], (err, result) => {
//     if (err) {
//       callback(true, err);
//     } else {
//       callback(undefined );
//     }
//   })
// }

// // mettre à jour la colonne coche en false
// function saveColumnF(id_etape, callback) {
//   const sql = "UPDATE etapes SET coche = false WHERE id_etape = $1";
//   utils.executeQuery(sql, [id_etape], (err, result) => {
//     if (err) {
//       callback(true, err);
//     } else {
//       callback(undefined );
//     }
//   })
// }