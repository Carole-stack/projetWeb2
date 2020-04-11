const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login', {
    title: 'connexion'
  });
});

module.exports = router;
