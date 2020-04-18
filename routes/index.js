const express = require('express');
const utils = require("../db/utils");

const router = express.Router();
/*

router.get("/", (req, res) => {
    utils.executeQuery("SELECT taches.titre, taches.date_tache, taches.note FROM USERS, listes, taches WHERE Id_user =$1 AND taches.date_tache IS NOT NULL AND USERS.Id_user = listes.Id_user AND listes.id_liste = taches.id_liste",
    [req.session.userId], (err, result) => {
        if (err) {
            res.status(500).send(err);
          } else {
              const tachesDetails = result.rows.length && result.rows[0];
              if(tachesDetails) {
                res.render("index", {
                    title: "Accueil",
                    defaultTitre: tachesDetails.titre,
                    defaultDate_tache: tachesDetails.date,
                    defaultNote: tachesDetails.note
                });
              }
              else {
                res.render("index", {
                    title: "Acceuil"
                })
              }
            }   
        });
        utils.executeQuery("SELECT * FROM listes WHERE id_user =$1 ",[req.session.userId], (err, result) => {
            if (err) {
                res.status(500).send(err);
              } else {
                  const listesList = result.rows;
                  res.render("index", {
                      listesList: listesList
                  });
                }   
            });
  });   */

// fonction d'affichage d'accueil basique
  router.get("/", (req, res) => {
    utils.executeQuery("SELECT * FROM listes WHERE id_user =$1 ",[req.session.userId], (err, result) => {
        if (err) {
            res.status(500).send(err);
          } else {
            console.log(result.rows);
              const listesList = result.rows;
              res.render("index", {
                  titre: "Accueil",
                  listesList: listesList
              });
            }   
        });  ///// MODIFIER CELLE LA POUR INDEX
  });





  /*   // Afficher la page d'une liste  on abesoin de la table liste pour afficher le nom de la liste
  // et de la table taches pour afficher toutes les taches cette liste
router.get("/:id([0-9]+)", (req, res) => {
  tasks_services.getAllIndex(req.params.id, (err, tacheList) => {
      if (err) {
        res.status(500).send(err);
        return;
      } 
        res.render("/liste", {
          nomDeListe: tacheList.name,
          tacheTitre: tacheList.titre,
          tachedDate: tacheList.date,
          tacheNote: tacheList.note    
        });
    }
  );
});   */
  module.exports = router;