const express = require("express");
const steps_services = require("../services/step");
const router = express.Router();

exports.createStep = (req, res)=> {
    const stepDetails = {
        ...req.body, 
        id_tache: req.params.id
    };
    if(!stepDetails.label) {
        res.status(409).json({ error: `Un ou plusieurs paramètres sont manquants.` });
        return;
    }

    steps_services.save(stepDetails, (err, result)=> {
        if(err){
            res.status(409).json({ error: 'Echec dans la création de étape.' });
            return
        }
        res.status(200).json({ message: `Etape ${result.id_etape} sauvegardée avec succès.` });
    })
};

exports.deleteStep = (req, res)=> {
    steps_services.deleteById(req.params.id, (err, result) => {
        if (err) {
            res.status(409).json({ error: 'Echec de la suppression de étape.' });
            return;
          }
          res.status(200).json({ message: `Etape ${req.params.id} supprimée avec succès.` });
    })
};

exports.UpDateStep = (req, res) => {
    const etapeDetails = {
        ...req.body,
        id: req.params.id
    };
    if((etapeDetails.id && Object.values(etapeDetails).length >= 1)=== false) {
        res.status(409).json({ error: 'Un ou plusieurs paramètres sont manquant.' });
        return;
    }
    steps_services.update(etapeDetails, (err, result) => {
        if (err) {
            res.status(409).json({ error: 'Echec dans la mise à jour de etape.' });
            return;
          }
          res.status(200).json({ message: `Etape  ${req.params.id} mise à jour avec succès.`
          });
    })
};