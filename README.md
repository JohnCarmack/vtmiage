# vtmiage

Le projet vtmiage est la refonte du logiciel de création d'emploi du temps de l'université d'Evry.
Le besoin est d'utiliser les technologies web afin d'ajouter une abstraction pour faciliter l'utilisation et la modification des models SQL via la création d'une API REST et l'utilisation d'un ORM pour la communication avec MySQL.

Cette API détaillée dans notre wiki sera utilisée par un autre projet qui s'occupe de la visualisation des emplois du temps afin de récuperer les données.

# Avancement (Pour la release 1 du 30/11/2015) : 

- Mise en place du serveur NodeJS : Done
- Mise en place de la base de données SQL avec NodeJS : Done
- Création du front-end : Done
- Création des models SQL via l'ORM Sequelize : Done
- Création des associations entre models : Done
- Ajout du calendrier frond-end : Done
- Implémentation de l'API : 100% Done
- Implémentation de l'enseignement dans le calendrier : Done
- Création du model de l'enseignement avec les heures et le nom de l'enseignement côté NodeJS : Done 
- Implémentation des séances coté NodeJS : Done
- -Implémentation de la suppression  de matiere : Done
- Implémentation de la suppression d'enseignement : Done
- Implémentation de la suppresion des séances d' une matière ou d'un enseignement : Done

# Installation du projet
Il faudra en pré-requis avoir une base MySQL au nom de "vtmiage", et en identifiant : "root" et mot de passe : "root", ces informations sont modifiables dans le fichier app.js à la partie : 
```console

 
sequelize = new Sequelize('vtmiage', 'root', 'root', {
  dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
  port:    3306, // or 5432 (for postgres)
});
```

Ensuite, il suffit de cloner ce dépôt sur votre machine locale, dans une console il suffit de se rendre dans le répértoire courant et taper :
```console
node app.js
``` 
Apparaitra alors 
```console
Express server listening on port 3000
Executing (default): SELECT 1+1 AS result
Connection has been established successfully.
``` 
Cela veut dire que tout se déroule sans erreurs, n'ayez craintes, la base de données et ses tables sont automatiquement créées.


