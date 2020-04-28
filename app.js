const express = require("express");
const session = require("express-session");
const helpers = require("./helpers/helpers");
const listeRoutes = require("./routes/listes");
const taskRoutes = require("./routes/tasks");
const stepsRoutes = require("./routes/steps");
// const signupRoutes = require("./routes/signup");
// const loginRoutes = require("./routes/login");
//const settingsRoutes = require("./routes/settings");
const bodyParser = require('body-parser')

let cors = require('cors')


const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

const sessionParams = {
  secret: "my_secret",
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
};
// middle 
//app.use(session(sessionParams));

// Middleware custom: executé pour chaque nouvelle requete HTTP
// app.use((req, res, next) => {
//   // Si l'ulisateur est authentifié
//   if (req.session && req.session.userId) {
//     res.locals.userid = req.session.userid;
//     res.locals.usermail = req.session.usermail,
//     res.locals.isAuthentificated = true;
//   }

//   // Si un infoMessage à été ajouté
//   if (req.session && req.session.infoMessage) {
//     res.locals.infoMessage = req.session.infoMessage;
//     req.session.infoMessage = null;
//   }
  
//   next();
// });

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Ajout declaration moteur de template
//app.set("view engine", "pug");


app.use("/listes", listeRoutes);
app.use("/tasks", taskRoutes);
app.use("/steps", stepsRoutes);
// app.use("/signup", signupRoutes);
// app.use("/login", loginRoutes);
//app.use("/settings", settingsRoutes);


// app.listen("3000", () => {
//   console.log("Server started");
// });

let server = app.listen(3000, () => {
  console.log(`Server started. Listening on port ${server.address().port}`);
  helpers.setServerPort(server.address().port);
});


// Middleware executé pour chaque nouvelle requete http avec cookie
// app.use((req, res, next) => {
//   // Si l'ulisateur est authentifié
//   if (req.session && req.session.userId) {
//     res.locals.usermail = req.session.userEmail;
//     res.locals.isAuthentificated = true;
//   }
  
//   next();
// });