const express = require('express');
const defaultRoutes = require('./routes/default');
const listeRoutes = require('./routes/liste');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');

const app = express();
app.use(express.static('public'));

// Ajout declaration moteur de template
app.set('view engine', 'pug');

app.use('/', defaultRoutes);
app.use('/liste', listeRoutes);
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);

app.listen(3000, () => {
  console.log('Server started');
});