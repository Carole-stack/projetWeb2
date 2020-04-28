const express = require("express");
const tasks_services = require("../services/tasks");
//const helpers = require("./helpers");
const router = express.Router();

exports.getAllTaches =  (req, res) => {
    tasks_services.getAllUser("1", (err, tasksList) => {
      if (err) {
        res.status(404).json({ error: 'Ressource non trouvée.' });
        return;
      }
      tasksList = tasksList.map(tache => ({
        ...tache,
      }));
  
      res.status(200).json({ tasksList: tasksList });
    });
  };

  exports.getTache = (req, res) => {
    console.log(req.params)
    tasks_services.getById(req.params.id, (err, tasksDetails) => {
      if (err) {
        res.status(404).json({ erorr: 'Ressource non trouvée.' });
        return;
      }
      tasksDetails = tasksDetails.map(detail => ({
        ...detail,
      }))
      console.log(tasksDetails)
      res.status(200).json({ tasksDetails: tasksDetails });
    });
  };

  exports.createTache = (req, res) => {
    const tacheDetails = {
      ...req.body,
      id_liste: req.params.id
    };
  
    if (!tacheDetails.id) {
      res.status(409).json({ error: `Un ou plusieurs paramètres sont manquants.` });
      return;
    }
    tasks_services.saveById(req.body, (err, result) => {
      if (err) {
        res.status(409).json({ error: 'Echec dans la création de tache.' });
        return;
      }
  
      res.status(200).json({ message: `Tache ${result.id_tache} sauvegardée avec succès.`});
    });
  };

exports.UpDateTache = (req, res) => {
    const tacheDetails = {
      ...req.body,
      id: req.params.id
    };
    console.log(req.params)
    if (!tacheDetails.id) {
      res.status(409).json({ error: `Un ou plusieurs paramètres sont manquant.` });
      return; // Pour sortir de la fonction
    }
    tasks_services.update(tacheDetails, (err, result) => {
      if (err) {
        res.status(409).json({ error: 'Echec de la mise à jour.' });
        return;
      }
      res.status(200).json({ message: `Tache ${req.params.id} mise à jour avec succès.` });
    });
  };

exports.deleteTache = (req, res) => {
    console.log(req.params)
    tasks_services.deleteById(req.params.id, (err, result) => {
      if (err) {
        res.status(409).json({ error: 'Echec de la suppression de la tache.' });
        return;
      }
  
      res.status(200).json({ message: `Tache ${req.params.id} supprimée avec succès.` });
  
    });
  };