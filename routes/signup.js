const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('signup', {
  	title: 'Signup'
  });
});

// Ajout d'un utilisateur
// @param: username, password, email, firstname, lastname
router.post('/', (req, res, next) => {

  usersServices.create(req.body, (err, result) => {
    if (err) {
      res.status(500).json({ message: result });
      return;
    }

    res.json({
      message: `Utilisateur ${result.username} / ${result.email} sauvegardé avec succès.`,
      id: result.id,
      username: result.username,
      email: result.email
    });
  });
});

module.exports = router;