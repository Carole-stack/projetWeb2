const tasks_Services = require("../services/tasks_services");
const list_Services = require("../services/lists_services");
const helpers = require("../helpers/helpers");
const express = require("express");
const router = express.Router();

router.get("/listes", (req, res) => {
    const orderBy = req.query.orderby;
    tasks_Services.getAllListe(orderBy, (err, projectsList) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
  
      // Ajouter l'URI depuis laquelle avoir les details du projet
      tacheList = tacheList.map(tache => ({ 
        ...tache, 
        "@details_uri": `${helpers.getBaseURI(req)}/api/task/${id_tache}` 
      }));
      res.json({ tacheList: tacheList });
    });
  });

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
        "@details_uri": `${helpers.getBaseURI(req)}/api/task/${id_tache}` 
      }));
      res.json({ tacheList: tacheList });
    });
  });


// Afficher le detail du projet dont l'ID est passée en param
router.get("/listes/:id([0-9]*)", (req, res) => {
    projectsServices.getById(req.params.id, (err, projectDetails) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
  
      res.json({ project: projectDetails });
    });
  });

module.exports = router;