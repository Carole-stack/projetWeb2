
//const utils = require("../db/utils");
const usersServices = require("../services/users");
const mailerServices = require("../services/mailer");

//const helpers = require("../helpers/helpers");
//const helpersMW = require("./helpers");
const express = require("express");
const jwt = require('jsonwebtoken');
const utils = require("../db/utils");
const config = require("../config.js");
const router = express.Router();


router.get('/email', (req, res, next) => {
    mailerServices.sendEmail({}, (err, result) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      res.json({ message: 'Message sent: ' + result.response });
  
    });
  });



  // Authentification et récupération du token JWT
router.post("/users/login", (req, res) => {

    usersServices.authenticate(req.body, (err, result) => {
      if (err) {
        res.status(500).json({ message: result });
        return;
      }
  
      const userFound = result;
      if (userFound) {
        const token = jwt.sign(
          { usermail: req.body.usermail }, 
          config.secret, 
          { expiresIn: '24h' }
        );
        res.json({
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.status(403).json({
          message: 'Incorrect username or password'
        });
      }
    });
  });
// const router = express.Router();
// // affichage de la page login
// router.get('/', (req, res) => {
//   // res.render('login', {
//   // 	title: 'Login'
//   // });
//   res.json({
//     message:"ubsrgiuneriounoi"
//   })
// });

//  //authentication de l'utilisateur
//  router.post('/send', (req, res) => {
//    const form = req.body;
//    const sql = "SELECT * FROM users WHERE usermail=$1 AND unsecured_password=$2";
//    const params = [form.usermail, form.password];

//    // Execution des commandes SQL
//   // On verifie que le couple usermail + password existe
//   // Puis on render la vue

// //postman

//   utils.executeQuery(sql, params, (err, result) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       const userFound = result.rows[0];

//       // Si userFound !== null, on le sauvegarde dans la session à l'aide d'un cookie
//       if (userFound) {
//         req.session.userId = userFound.id_user;
//         req.session.userEmail = userFound.usermail;
//         res.locals.isAuthentificated = true;
//         res.locals.usermail = userFound.usermail;
       
//         const userInfor={
//           userUsername:userFound.id_user,
//           message: "allo "
//         }
        
//         res.json(userInfor);
//       }
//     }
//   });  


// // se déonnecter
// router.get('/logout', (req, res) => {
//   req.session.destroy();
//   res.redirect('/');
// });


// router.get('/logout/motoublie', (req, res) => {
//   res.render('login_motoublie', {
//     title: 'forgotpassword'
//   });
// });

 module.exports = router;