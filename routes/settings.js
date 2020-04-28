const express = require('express');
const setting_services = require('../services/settings.js');
const router = express.Router();

// router.get('/', (req, res) => {
//     res.render('settings', {
//         title: 'Paramètres'
//     });
//   });

router.post('/usermail', (req, res) => {

    res.json("houhoules paramètres");
});

 
  module.exports = router;