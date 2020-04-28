const express = require("express");
//const steps_services = require("../services/step");
const ctrlList = require('../controllers/steps');
const router = express.Router();

router.post("/create/:id([0-9]*)", ctrlList.createStep);
router.delete("/:id([0-9]*)", ctrlList.deleteStep);
router.patch("/etapes/;id([0-9]*)", ctrlList.UpDateStep);




  
module.exports = router;

// // pour creer une etape et la sauvegarder en BD
// router.post("/create/:id([0-9]*)", (req, res)=> {
//     const stepDetails = {
//         ...req.body, 
//         id_tache: req.params.id
//     };
//     if(!stepDetails.label) {
//         res.status(500).json({
//             'message': `Un ou plusieurs paramètres sont manquants.`
//         });
//         return;
//     }

//     steps_services.save(stepDetails, (err, result)=> {
//         if(err){
//             res.status(500).json({ message: err });
//             return
//         }
//         res.json({
//           message: `Etape ${result.id_etape} sauvegardée avec succès.`
//         });
//     })
// })

// // supprimer une etape
// router.delete("/:id([0-9]*)", (req, res)=> {
//     steps_services.deleteById(req.params.id, (err, result) => {
//         if (err) {
//             res.status(500).json({ message: err });
//             return;
//           }
//           res.json({ message: `Etape ${req.params.id} supprimée avec succès.` });
//     })
// });


// // mettre a jour le label d'une étape
// router.patch("/etapes/;id([0-9]*)", (req, res) => {
//     const etapeDetails = {
//         ...req.body,
//         id: req.params.id
//     };
//     if((etapeDetails.id && Object.values(etapeDetails).length >= 1)=== false) {
//         res.status(500).json({
//             'message': 'Un ou plusieurs paramètres sont manquant.'
//         });
//         return;
//     }
//     steps_services.update(etapeDetails, (err, result) => {
//         if (err) {
//             res.status(500).json({ message: err });
//             return;
//           }
//           res.json({
//             message: `Etape  ${req.params.id} mise à jour avec succès.`
//           });
//     })
// })

// // affiche  la valeur de la colonne coche d'une etape 
// router.get("/column/:id([0-9]*)", (req, res) => {
//     steps_services.getColumn(req.params.id, (err, etapeCoche) => {
//       if (err){
//         res.status(500).json({ message: 'etape erreur' });
//         return;
//     }
//     etapeCoche = etapeCoche.map(coche => ({
//       ...coche, 
//     }));
//     res.json({etapeCoche});
//     })
//   })

// // mettre à jour le statut de la colonne coche d'une etape cochée
// router.patch("/coche/:id([0-9]*)", (req, res) => {
//     steps_services.saveColumnT(req.params.id, (err, result) => {
//       if (err) {
//         res.status(500).json({ message: err });
//         return;
//       }
  
//       res.json({ message: `Etape cochée avec succès.` });
  
//     })
//   })
//   // mettre à jour le statut de la colonne coche d'une etape décochée
//   router.patch("/decoche/:id([0-9]*)", (req, res) => {
//     steps_services.saveColumnF(req.params.id, (err, result) => {
//       if (err) {
//         res.status(500).json({ message: err });
//         return;
//       }
  
//       res.json({ message: `Etape decochée avec succès.` });
  
//     })
//   })