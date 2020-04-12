const express = require('express');
const utils = require("../db/utils");
const helpers = require("./helpers");

const router = express.Router();

//route qui permet d'arriver sur la page d'édition de liste
router.get("/", (req, res) => {
  utils.executeQuery("SELECT * FROM listes WHERE id_liste=$1", [req.params.id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const details = result.rows[0];
      res.render('liste', {
          title:  "Edition de liste",
          // code de Aissatou
        });
      }
  });
});

//route qui permet de faire apparaitre le formulaire pour creer la liste
router.get("/add", helpers.limitAccessToAuthentificatedOnly, (req, res) => {
  res.render("list_add", {
    title: "Ajouter une nouvelle liste"
  });
});

// route qui permet de mettre a jour la base de donnée
  router.post("/create", (req, res) => {
    const form = req.body;
    const sql = "INSERT INTO listes (id_user, name) VALUES ($1, $2)";
    utils.executeQuery(sql, [req.session.userId, form.name], (err, res) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.redirect("/liste");
      }
    });
  });
 
  // Afficher la page d'une liste
router.get("/:id([0-9]+)", (req, res) => {
  utils.executeQuery("SELECT * FROM listes WHERE id_liste=$1", [req.params.id], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const listeDetails = result.rows[0];
        res.render("/liste", {
          titreDeListe: listeDetails.name
        });
      }
    }
  );
});


// Suppression d'une liste
router.get("/:id([0-9]+)/delete", (req, res) => {
  const listeId = req.params.id;
  const sql = "DELETE FROM projects WHERE id=$1";
  utils.executeQuery(sql, [listeId], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.session.infoMessage = `Le projet #${projectId} a été supprimé.`
      res.redirect("/projects");
    }
  });
});
  module.exports = router;