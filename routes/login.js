const express = require('express');
const utils = require("../db/utils");

const router = express.Router();
// affichage de la page login
router.get('/', (req, res) => {
  res.render('login', {
  	title: 'Login'
  });
});

// se deconnecter
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
// authentication de l'utilisateur
router.post('/send', (req, res) => {
  const form = req.body;
  const sql = "SELECT * FROM users WHERE usermail=$1 AND unsecured_password=$2";
  const params = verifyUser(form.usermail, form.password);

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
        req.session.userId = userFound.id;
        req.session.usermail = userFound.usermail;
        res.locals.usermail = userFound.usermail;

        req.session.infoMessage = `Vous êtes connecté en temps que ${userFound.username}`;
        res.redirect("/");
      }
      else {
        res.session.infoMessage = "L'identifiant ou le mot de pass sont incorrect";
        res.redirect("/login");
      }
    }
  });  
});



module.exports = router;