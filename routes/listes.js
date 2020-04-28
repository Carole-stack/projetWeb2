const express = require('express');
//const tasks_services = require("../services/tasks_services");
//const list_services = require("../services/list_services");
//const helpers = require("./helpers");
const ctrlList = require('../controllers/listes');
const router = express.Router();

router.get("/", ctrlList.getAllListe);
router.get("/:id([0-9]*)", ctrlList.getOneListe);
router.post("/create", ctrlList.postCreateListe);
router.delete("/:id([0-9]*)", ctrlList.deleteListe);








  module.exports = router;

  //route qui affiche toutes la liste les listes d'un utilisateur connecté
// router.get("/", (req, res) => {
//   console.log(req.headers.authorization)
//   list_services.get("1", (err, listeList) => {
//     if (err) {
//       res.status(404).json({ error: 'Liste non trouvée'});
//       return;
//     }
//     listeList = listeList.map(liste =>({
//       ...liste,
//       //'@details_uri': `${helpers.getBaseURI(req)}/index/listes/${id_liste}`
//     }))
   
//     res.status(200).json({listeList: listeList });
//   });
// });


// // Afficher toutes les taches appartenant a une liste pour un utilisateur
// router.get("/:id([0-9]*)", (req, res) => {
//   console.log(req.params)
//   list_services.getById(req.params.id, (err, taskslist) => {
//     if (err) {
//       res.status(500).json({ error: 'jai un soucis'});
//       return;
//     }
//     taskslist = taskslist.map(tache => ({
//       ...tache,
//     }))
//     console.log(taskslist)
//     res.json({ taskslist: taskslist });
//   });
// });

//  // Ajouter une nouvelle liste à partir d'un formulaire d'ajout de liste
//  router.post("/create", (req, res) => {
//   //console.log('IN')
//   //console.log(req.body)
//   if(!req.body.Id_user||!req.body.name){
//     res.json({
//       message: `Les paramètres ne sont pas bons!`
//     });
//   }
//   list_services.save(req.body, (err, result) => {
//     if (err) {
//       res.status(500).json({ message: err });
//       return;
//     }

//     res.json({
//       message: `Liste ${result.nameListe} sauvegardée avec succès.`
//     });
//   });
// });

// // Supprimer la liste dont l'Id est passé en param
// router.delete("/:id([0-9]*)", (req, res) => {

//   list_services.deleteById(req.params.id, (err, result) => {
//     if (err) {
//       res.status(500).json({ message: err });
//       return;
//     }

//     res.json({ message: `Liste ${req.params.id} supprimée avec succès.` });
//   });
// });