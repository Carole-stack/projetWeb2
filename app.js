const express = require('express');
const session = require('express-session');
const helpers = require("./routes/helpers");
const defaultRoutes = require('./routes/default');
const listeRoutes = require('./routes/liste');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');

const app = express();

const sessionParams = {
  secret: 'my_secret',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
};
app.use(session(sessionParams));

// Middleware executé pour chaque nouvelle requete http
app.use((req, res, next) => {
  // Si l'ulisateur est authentifié
  if (req.session && req.session.userId) {
    res.locals.usermail = req.session.usermail;
    res.locals.isAuthentificated = true;
  }
  
  next();
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Ajout declaration moteur de template
app.set('view engine', 'pug');


app.use('/', defaultRoutes);
app.use('/helpers', helpers);
app.use('/liste', listeRoutes);
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);

app.listen(3000, () => {
  console.log('Server started');
});