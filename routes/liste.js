const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('liste', { 
      title: 'Liste'
    });
  });

  module.exports = router;