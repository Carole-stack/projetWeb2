-- INSERT Projects
DROP TABLE IF EXISTS listes;

CREATE TABLE listes (
  id_liste SERIAL PRIMARY KEY,
  id_users FOREIGN KEY,
  name VARCHAR,
  created_at timestamp default current_timestamp
);

INSERT INTO listes (name) VALUES ('projet web');
INSERT INTO listes (name) VALUES ('projet System');

--INSERT Taches
DROP TABLE IF EXISTS taches;

CREATE TABLE taches (
    id_tache SERIAL PRIMARY KEY,
    id_liste FOREIGN KEY,
    titre VARCHAR,
    date_tache, VARCHAR,
    note VARCHAR,
    created_at timestamp default current_timestamp
);
INSERT INTO taches (id_tache, id_liste, titre, date_tache, note) VALUES ('Enregistrer le repository', '12/05/20', 'urgent');

-- INSERT Usersi
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR(20),
  firstname VARCHAR,
  lastname VARCHAR,
  unsecured_password VARCHAR(20),
  created_at timestamp default current_timestamp
);

INSERT INTO users (username, firstname, lastname, unsecured_password) VALUES ('seafoox', 'Alexandre', 'Collin', '123456');
INSERT INTO users (username, firstname, lastname, unsecured_password) VALUES ('toto', 'Thomas', 'Dupont', '123456');