const express = require('express');
const utils = require("../db/utils");
const helpers = require("./helpers");

const router = express.Router();

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
        res.local.liste.name = form.name;
        res.redirect("/liste");
      }
    });
  });
 
  // Afficher la page d'une liste
router.get("/:id([0-9]+)", (req, res) => {
  utils.executeQuery("SELECT * FROM listes WHERE id=$1", [req.params.id], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const listeDetails = result.rows[0];
        res.render("index", {
          listeDetails
        });
      }
    }
  );
});

router.get("/:id([0-9]+)", (req, res) => {
  utils.executeQuery("SELECT * FROM listes where id_liste = $1", [req.params.id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
        const listeDetails = result.rows[0];
        res.render('liste/{id}', {
          title: "Liste",
          titreDeListe: listeDetails.name
        });
    }
  });
});
  module.exports = router;