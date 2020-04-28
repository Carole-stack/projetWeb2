const utils = require("../db/utils");
const bcrypt = require('bcrypt');

// Fonction que l'on souhaite rendre visible à l'exterieur du module
module.exports = {
  updateMail,
  updatePassword
};

function updateMail ({ user_id, mail1, mail2 }, callback) {
    //Gestion des erreurs
    //Vérification de format de l'adresse mail
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail1)) {
        //Premier paramètre de la callback = err --> objet avec le code d'erreur et la cause
        //Deuxième paramètre de la callbak = result --> undefined car on vérifie uniquement l'erreur
        callback({code: 400, error: { cause: 'L\'adresse mail n\'est pas valide'}}, undefined);
        return;
    } 
    
    //Vérification de la correspondance entre les 2 adresses mail
    if (mail1 != mail2) {
        //Premier paramètre de la callback = err --> objet avec le code d'erreur et la cause
        //Deuxième paramètre de la callbak = result --> undefined car on vérifie uniquement l'erreur
        callback({code: 400, error: { cause: 'Les adresses mail doivent être identiques'}}, undefined);
        return;
    }

    //Requête de mise à jour de l'adresse mail
    const query = "UPDATE users SET usermail=$1 WHERE Id_user=$2";
    utils.executeQuery(query, [mail1, user_id], (err, result) => {
        if (err) {
            //Premier paramètre de la callback = err --> objet avec le code d'erreur et la cause
            //Deuxième paramètre de la callbak = result --> undefined car on vérifie uniquement l'erreur
            callback({code: 500, error: {cause: 'Erreur serveur'}}, undefined);
        } else {
            //Premier paramètre de la callback = err --> pas d'erreur ici donc undefined
            //Deuxième paramètre de la callbak = result --> renvoie un message
            callback(undefined, {msg : `L'adresse mail ${mail1} a été mise à jour.`});
        }
    }); 
}

function updatePassword ({ user_id, password1, password2, password3 }, callback) {
    //Vérification que le mot de passe actuel correspond bien au compte associé
    const cpyptedPassword = bcrypt.hashSync(password1, 10);
    utils.executeQuery("SELECT encrypted_password FROM users where Id_user=$2 and encrypted_password=$1", [cpyptedPassword, user_id], (err, result) => {
        if (err) {
            callback({code: 500, error: { cause: 'Erreur server'}}, undefined);
        } else {
            const oldPassword = result.rows[0];
            if (oldPassword == undefined) {
                callback({code: 400, error: { cause: 'Le mot de passe actuel est incorrect'}}, undefined);
                return;
                
            } else {
                //Vérification de la correspondance entre les deux champs
                if (password2 != password3) {
                    callback({code: 400, error: { cause: 'Les mots de passe doivent être identiques'}}, undefined);
                    return;
                }
                
                //Requête de mise à jour du mot de passe
                const query = "UPDATE users SET encrypted_password=$1 WHERE Id_user=$2";
                const newCryptedPassword = bcrypt.hashSync(password2, 10);
                utils.executeQuery(query, [newCryptedPassword, user_id], (err, result) => {
                    if (err) {
                        callback({code: 500, error: { cause: 'Erreur server'}}, undefined);
                    } else {
                        callback(undefined, {msg : `Le mot de passe a été mis à jour.`});
                    }
                });
            }
        }      
    });
    
};
