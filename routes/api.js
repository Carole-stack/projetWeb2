const tasks_Services = require("../services/tasks_services");
const list_Services = require("../services/lists_services");
const helpers = require("../helpers/helpers");
const express = require("express");
const router = express.Router();



  // afficher la page d'acceuil
  router.get("/index", (req, res) => {
    const orderBy = req.query.orderby;
    tasks_Services.getAllIndex(orderBy, (err, projectsList) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
  
      // Ajouter l'URI depuis laquelle avoir les details du projet
      tacheList = tacheList.map(tache => ({ 
        ...tache, 
        "@details_uri": `${helpers.getBaseURI(req)}/api/ /${id_tache}` 
      }));
      res.json({ tacheList: tacheList });
    });
  });


// Afficher la page d'édtion de liste (dont l'ID est passée en param)
// quand on clique sur la liste 
router.get("/listes/:id([0-9]*)", (req, res) => {
    tasks_Services.getAllById(req.params.id, (err, projectDetails) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      // Ajouter l'URI depuis laquelle avoir les details du projet
      tacheList = tacheList.map(tache => ({ 
        ...tache, 
        "@details_uri": `${helpers.getBaseURI(req)}/api/taches/${id_tache}` 
      }));
      res.json({ tacheList: tacheList });
    });
  });

  
// Ajouter une nouvelle liste
router.post("/create", (req, res) => {
  list_Services.save(req.body, (err, result) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    res.json({ 
      message: `Liste ${result.listList} ajoutée avec succès.`,
      id: result.id_liste,
      '@details_uri': `${helpers.getBaseURI(req)}/api/listes/${result.id_liste}`
    });
  });
});


module.exports = router;