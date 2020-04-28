const express = require('express');
//const tasks_services = require("../services/tasks_services");
const list_services = require("../services/listes");
//const helpers = require("./helpers");

const router = express.Router();

exports.getAllListe =  (req, res) => {
    console.log(req.headers.authorization)
    list_services.get("1", (err, listeList) => {
      if (err) {
        res.status(404).json({ error: 'Liste non trouvée'});
        return;
      }
      listeList = listeList.map(liste =>({
        ...liste,
        //'@details_uri': `${helpers.getBaseURI(req)}/index/listes/${id_liste}`
      }))
     
      res.status(200).json({listeList: listeList });
    });
};

exports.getOneListe = (req, res) => {
  console.log(req.params)
  list_services.getById(req.params.id, (err, taskslist) => {
    if (err) {
      res.status(404).json({ error: 'Liste non trouvée'});
      return;
    }
    taskslist = taskslist.map(tache => ({
      ...tache,
    }))
    console.log(taskslist)
    res.status(200).json({ taskslist: taskslist });
  });
};

exports.postCreateListe = (req, res) => {
  if(!req.body.Id_user||!req.body.name){
    res.status(400).json({ error: `Les paramètres ne sont pas bons!`});
  }
  list_services.save(req.body, (err, result) => {
    if (err) {
      res.status(409).json({ error: 'Echec dans la création de liste.' });
      return;
    }

    res.status(201).json({ message: `Liste ${result.nameListe} sauvegardée avec succès.`});
  });
};

exports.deleteListe = (req, res) => {

  list_services.deleteById(req.params.id, (err, result) => {
    if (err) {
      res.status(409).json({ error: 'Echec de la suppression de liste.' });
      return;
    }

    res.status(200).json({ message: `Liste ${req.params.id} supprimée avec succès.` });
  });
};