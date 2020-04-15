-- INSERT Projects

DROP TABLE IF EXISTS taches;
DROP TABLE IF EXISTS listes;
DROP TABLE IF EXISTS users;

CREATE TABLE USERS (
  Id_user SERIAL PRIMARY KEY,
  usermail VARCHAR(25),
  unsecured_password VARCHAR(20),
  created_at timestamp default current_timestamp
);

INSERT INTO USERS (usermail, unsecured_password) VALUES ('henriette3@me.com', '123456');


CREATE TABLE listes (
  id_liste SERIAL PRIMARY KEY,
  Id_user INTEGER,
  name VARCHAR,
  created_at timestamp default current_timestamp
);
ALTER TABLE listes ADD CONSTRAINT FK_Id_users FOREIGN KEY (Id_user)
REFERENCES users(Id_user);

INSERT INTO listes (Id_user, name) VALUES (1, 'projet web');
INSERT INTO listes (Id_user, name) VALUES (1, 'projet System');



CREATE TABLE taches (
    id_tache SERIAL PRIMARY KEY,
    id_liste INTEGER,
    titre VARCHAR,
    date_tache VARCHAR,
    note VARCHAR,
    created_at timestamp default current_timestamp
);

ALTER TABLE taches ADD CONSTRAINT FK_id_liste FOREIGN KEY (id_Liste)
REFERENCES listes(id_liste);

INSERT INTO taches (id_liste, titre, date_tache, note) VALUES (1, 'enregistrer sur git', '12/05/20', 'blablabla');
