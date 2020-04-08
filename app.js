const app = express();
const sessionParams = {
    secret: "my_secret",
    maxAge: 24 * 60 * 60 * 1000
  };
  app.use(session(sessionParams));
  app.use(express.static("public"));
  app.set("view engine", "pug");
  
  app.use((req, res, next) => {
    if (req.session && req.session.userId) {
      res.locals.username = req.session.username;
    }
    next();
  });
var listes = [
    {
        titre: "Projet WEb",
        taches1: 
            {
                titreTache: "enregistrement",
                note: "blabal",
                Date: 12/04/20
            },
        tache2:
            {
                titreTache: "page d'accueil",
                note: "blabalblibli",
                Date: 20/04/20
            }
        
    },
    {
        titre: "Projet Systeme",
    }
];
var listeElt = document.createElement("li");
listes.forEach(liste => {
    var titreListe = document.createElement("p");
    titreListe.id = "titreListe";
    titreListe.textContent = liste.titre;
    listeElt.appendChild(titreListe);
});
document.getElementById("meslistes").appendChild(listeElt);

/*   listeElt.addEventListener("click", function() {
place pour coder le lien pour afficher la page édition de liste
})   */

app.listen("3000", () => {
    console.log("Server started");
  });
