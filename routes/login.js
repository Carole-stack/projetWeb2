const express = require('express');
const utils = require("../db/utils");

const router = express.Router();
// affichage de la page login
router.get('/', (req, res) => {
  res.render('login', {
  	title: 'Login'
  });
});

// authentication de l'utilisateur
router.post('/send', (req, res) => {
  const form = req.body;
  const sql = "SELECT * FROM users WHERE usermail=$1 AND unsecured_password=$2";
  const params = [form.usermail, form.password];

   // Execution des commandes SQL
  // On verifie que le couple usermail + password existe
  // Puis on render la vue
  utils.executeQuery(sql, params, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const userFound = result.rows[0];

      // Si userFound !== null, on le sauvegarde dans la session à l'aide d'un cookie
      if (userFound) {
        req.session.userId = userFound.id_user;
        req.session.userEmail = userFound.usermail;
        res.locals.isAuthentificated = true;
        res.locals.usermail = userFound.usermail;
       
        res.redirect("/index");
      }
      else {
        res.redirect("/login");
      }
    }
  });  
});

// se déonnecter
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;