// route de la page "Prochaines tâches"
// ensuite faire passer sous condition d'authentification 

const express = require("express");
const tasksServices = require("../services/tasks_services.js");
const helpers = require("./helpers");
//const listeRoute = require("./route/liste")
const router = express.Router();


//Afficher la liste des taches 

router.get("/",helpers.limitAccessToAuthentificatedOnly, (req,res) => {
//On récupère les tâches d'une liste

    taksServices.getAllListe((err, tacheList) =>{
        if(err) {
            res.status(500).send(err);
            return;

        }
        else{
        const tacheList = result.rows;
        res.render("liste", {
            titre: "Tâches",
            tacheList: tacheList

        });
    }});
});

//Afficher le détail d'une tâche 

// doit survenir après avoir cliqué sur une tache (p.4/5 dans la maquette édition de liste ) :
// nécessite une page pug : surement un extend layout avec le code de carole

router.get("/:id([0-9])+",helpers.limitAccessToAuthentificatedOnly, (req, res) =>{
    
    tasksServices.getById(req.param.id, (err, taksDetails)=>{
        if (err){
            res.status(500).send(err);
            return;
        }

        res.render("task_details", {
            title:`Tache ${req.params.id}`,
            taksDetails: tasksDetails
        });
    });
});



//Afficher la page d'ajout d'une tâche 
//combien de callback ?? 

// doit survenir après avoir cliqué sur une tache (p.4/5 dans la maquette édition de liste ) :
// nécessite une page pug : surement un extend layout avec le code de carole 

router.get("/add_task", helpers.limitAccessToAuthentificatedOnly, (req, res) => {
    res.render("task_add", { // il faut créer la page pug 
      title: "Ajouter une nouvelle tâche"
    });
  });

  //ajouter la tâche en BD (penser à rajouter la contrainte d'authentification)

router.post("/create", helpers.limitAccessToAuthentificatedOnly,(req, res)=> {
    const taskDetails = req.body; 

    tasksServices.save(taskDetails, (err,result)=>{
        if(err){
            res.status(500).send(err);
            return
        }
        req.session.infoMessage = "La tâche a bien été ajoutée";
        res.redirect("/tasks");
    });
  });


  //Afficher la MAJ d'une tâche 
router.get("/:id([0-9]+)/update",helpers.limitAccessToAuthentificatedOnly, (req, res) => {
    tasksServices.getById(req.params.id, (err, taskDetails) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      
      //renvoyé dans tache_liste
      res.render("task_list", { // ou task_add
        title: `Edition d'une tache ${taskDetails.id_tache}`,
        tacheId: taskDetails.id_tache,//peut être à retirer 
        defaultTitle: taskDetails.titre,
        defaultDeadline: taksDetails.date_tache,
        defaultNote: tasksDetails.note,

      });
    });
  });


  // MAJ en BD

router.post("/update",helpers.limitAccessToAuthentificatedOnly, (req, res) => {
    
    tasksServices.update(req.body, (err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      
      // voir si le titre est plus simple compréhensible
      req.session.infoMessage = `La tache #${req.body.tacheId} a été mis à jour.`
      res.redirect("/taks");
    });
  });


//supprimer une tache 

router.get("/:id([0-9]+)/delete",helpers.limitAccessToAuthentificatedOnly, (req, res) => {
    taksServices.deleteById(idTask, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
  
      req.session.infoMessage = `La tâche #${tacheId} - #${defautltTitle} a bien été supprimé.`
      res.redirect("/tasks");
    });
  });
  
  module.exports = router;