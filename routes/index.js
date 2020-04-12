const express = require('express');
const utils = require("../db/utils");

const router = express.Router();


router.get("/", (req, res) => {
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
  });

  module.exports = router;