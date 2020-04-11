const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('settings', {
        title: 'Paramètres'
    });
  });

  module.exports = router;