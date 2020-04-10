const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  const accueilText = `
    Accueil
  `;

  // Appel la vue views/index.pug de facon implicite en lui passant les
  // variables "content", "myTitle", "sayHelloFunction"
  res.render('index', {
    content: accueilText,
    title: 'Accueil'
  });
});

module.exports = router;