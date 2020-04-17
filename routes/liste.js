const express = require('express');
const tasks_services = require("../services/tasks_services");
const list_services = require("../services/list_services");
const helpers = require("./helpers");

const router = express.Router();

//route qui permet d'arriver sur la page d'édition de liste

router.get("/:id([0-9]+)", helpers.limitAccessToAuthentificatedOnly, (req, res) => {
  tasks_services.getAllListe(req.params.id, (err, tacheList) => {
    if (err) {
      res.status(500).send(err);
      return;
    } 
      res.render('liste', {
          title: "Edition de liste",
          tacheList: tacheList
        });
      
  });
});

//route qui permet de faire apparaitre le formulaire pour creer la liste
router.get("/add", helpers.limitAccessToAuthentificatedOnly, (req, res) => {
  res.render("list_add", {
    title: "Ajouter une nouvelle liste"
  });
});

// route qui permet de mettre a jour la base de donnée en créant une liste
  router.post("/create",helpers.limitAccessToAuthentificatedOnly, (req, res) => {
    const form = req.body;
    
    list_services.save(req.session.userId, form.name, (err, res) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.redirect("/liste");
      }
    });
  });
 
  // Afficher la page d'une liste  on abesoin de la table liste pour afficher le nom de la liste
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
          tachedDate_tache: tacheList.date,
          tacheNote: tacheList.note    
        });
    }
  );
});


// Suppression d'une liste
router.get("/:id([0-9]+)/delete", helpers.limitAccessToAuthentificatedOnly, (req, res) => {
  const listeId = req.params.id;
  list_services.deleteById(sql, listeId, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    } 
      req.session.infoMessage = `La Liste #${listeId} a été supprimée.`
      res.redirect("/listes");
    
  });
});
  module.exports = router;