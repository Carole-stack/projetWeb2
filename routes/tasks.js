const express = require("express");
//const tasks_services = require("../services/tasks_services");
//const helpers = require("./helpers");
const ctrlList = require('../controllers/tasks');
const router = express.Router();

router.get("/", ctrlList.getAllTaches);
router.get("/:id([0-9]*)", ctrlList.getTache);
router.post("/create/:id([0-9]*)", ctrlList.createTache);
router.patch("/:id([0-9]*)", ctrlList.UpDateTache);
router.delete("/:id([0-9]*)", ctrlList.deleteTache);




// // mettre à jour le statut de la colonne done d'une tache cochée
// router.patch("/coche/:id([0-9]*)", (req, res) => {
//   tasks_services.saveColumnT(req.params.id, (err, result) => {
//     if (err) {
//       res.status(500).json({ message: err });
//       return;
//     }

//     res.json({ message: `Tache cochée avec succès.` });

//   });
// });
// // mettre à jour le statut de la colonne done d'une tache décochée
// router.patch("/decoche/:id([0-9]*)", (req, res) => {
//   tasks_services.saveColumnF(req.params.id, (err, result) => {
//     if (err) {
//       res.status(500).json({ message: err });
//       return;
//     }

//     res.json({ message: `Tache decochée avec succès.` });

//   });
// });
module.exports = router;


// //Afficher la liste de toutes les taches pour un utilisateur 
// router.get("/", (req, res) => {
//   tasks_services.getAllUser("1", (err, tasksList) => {
//     if (err) {
//       res.status(500).json({ message: err });
//       return;
//     }
//     tasksList = tasksList.map(tache => ({
//       ...tache,
//     }));

//     res.json({ tasksList: tasksList });
//   });
// });


// // mettre à jour une tache ou la créer si elle n'existe pas
// router.put("/tache/:id[(0-9]*)", (req, res) => {
//   Params = req.params;
//   console.log(req.params);
//   if(req.params.id == NULL) {
//     //checker si l'élément existe on le met à jour, sinon on le crée
//     const tacheDetails = {
//       ...req.body,
//       id_liste: req.params.id
//     };

//     if((tacheDetails.id && Object.values(tacheDetails).length >= 3) === false) {
//       res.status(500).json({ 
//         'message': `Un ou plusieurs paramètres sont manquant.`
//       });
//       return; 
//     }

//     tasks_services.save(tacheDetails, (err,result)=> {
//           if(err){
//               res.status(500).json({ message: err });
//               return
//           }
//           res.json({
//             message: `Tache ${result.id_tache} sauvegardée avec succès.`
//           });
//       });
//     return;
//     }
//     //si elle existe on la met à jour
//     else {

//     }
// });


// // affiche  la valeur de la colonne done
// router.get("/column/:id([0-9]*)", (req, res) => {
//   tasks_services.getColumn(req.params.id, (err, taskDone) => {
//     if (err){
//       res.status(500).json({ message: err });
//       return;
//   }
//   taskDone = taskDone.map(done => ({
//     ...done, 
//   }));
//   res.json({taskDone});
//   })
// })

// // route qui permet d'obtenir les détails d'une tache y compris les étapes
// router.get("/:id([0-9]*)", (req, res) => {
//   console.log(req.params)
//   tasks_services.getById(req.params.id, (err, tasksDetails) => {
//     if (err) {
//       res.status(500).json({ message: err });
//       return;
//     }
//     tasksDetails = tasksDetails.map(detail => ({
//       ...detail,
//     }))
//     console.log(tasksDetails)
//     res.json({ tasksDetails: tasksDetails });
//   });
// });

// router.post("/create/:id([0-9]*)", (req, res) => {
//   const tacheDetails = {
//     ...req.body,
//     id_liste: req.params.id
//   };

//   if (!tacheDetails.id) {
//     res.status(500).json({
//       'message': `Un ou plusieurs paramètres sont manquants.`
//     });
//     return;
//   }
//   tasks_services.saveById(req.body, (err, result) => {
//     if (err) {
//       res.status(500).json({ message: err });
//       return;
//     }

//     res.json({
//       message: `Tache ${result.id_tache} sauvegardée avec succès.`
//     });
//   });
// });


// // MAJ en BD d'une tache via le formulaire d'édition de la tache
// router.patch("/:id([0-9]*)", (req, res) => {
//   const tacheDetails = {
//     ...req.body,
//     id: req.params.id
//   };
//   console.log(req.params)
//   if (!tacheDetails.id) {
//     res.status(500).json({
//       'message': `Un ou plusieurs paramètres sont manquant.`
//     });
//     return; // Pour sortir de la fonction
//   }
//   tasks_services.update(tacheDetails, (err, result) => {
//     if (err) {
//       res.status(500).json({ message: err });
//       return;
//     }
//     res.json({
//       message: `Tache ${req.params.id} mise à jour avec succès.`
//     });
//   });
// });

// //supprimer une tache 

// router.delete("/:id([0-9]*)", (req, res) => {
//   console.log(req.params)
//   tasks_services.deleteById(req.params.id, (err, result) => {
//     if (err) {
//       res.status(500).json({ message: err });
//       return;
//     }

//     res.json({ message: `Tache ${req.params.id} supprimée avec succès.` });

//   });
// });