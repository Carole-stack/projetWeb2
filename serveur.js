
let express = require('express')
const session = require("express-session");
const utils = require("/db/utils");
const helpers = require("/routes/helpers");

const app = express();
const sessionParams = {
    secret: "my_secret",
    maxAge: 24 * 60 * 60 * 1000
  };
  app.use(session(sessionParams));
  
  app.use((req, res, next) => {
    if (req.session && req.session.userId) {
      res.locals.username = req.session.username;
    }
    next();
  });
  
  app.use(express.static("public"));
  
  app.use(express.urlencoded({ extended: true }));
  
  app.set("view engine", "pug");

//requete qui permet d'appeler toutes les taches dans l'ordre chronologique
  app.get('/taches', (req, res) => {
      utils.executeQuery("SELECT * FROM taches LIMIT 100 WHERE date_tache >= SYSDATE ORDER BY date_tache", [], (err, result) => {
          if(err) {
              res.status(500).send(err);
          } else {
            let taches = result.rows.length && result.rows[0];
            if (taches) {
              res.render("taches", {
                titre: taches.titreTache})
            }
            
          }
      })
    
  })
// requete qui va créer une tache
  app.post('/taches', (req, res) => {
    console.log(req.body)
    if (!req.body.content || !req.body.author) {
      return res.status(400).json({
        message: 'content and author are required'
      })
    }
  
    let newTache = {
      id: shortid.generate(),
      id: 
      titre: req.body.titre,
      date: req.body.date,
      note: []
    }
  
    sql.get('taches').push(newTache).write()
  
    return res.status(201).json(newTache)
  })

  app.listen("3000", () => {
    console.log("Server started");
  });