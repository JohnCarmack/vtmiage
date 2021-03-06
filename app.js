var express        = require( 'express' );
var http           = require( 'http' );
var path           = require( 'path' );
var fs             = require('fs');
var stylus         = require('stylus');
var session = require('client-sessions');

var bodyParser     = require( 'body-parser' );

var logger         = require( 'morgan' );

var static         = require( 'serve-static' );

var app    = express();

var router = express.Router();
var nib = require('nib');
var Sequelize = require('sequelize');

sequelize = new Sequelize('vtmiage', 'root', 'root', {
  dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
  port:    3306, // or 5432 (for postgres)
});
// check database connection
sequelize
.authenticate()
.then(function(err) {
  console.log('Connection has been established successfully.');
}, function (err) {
  console.log('Unable to connect to the database:', err);
});



//Permet de rendre les fichiers html
app.use(express.static(__dirname +  '/public'));
app.set( 'views',  __dirname + '/public/' );






app.use( logger( 'dev' ));
app.set('json spaces', 4);
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended : true  }));


//Définition des models SQL
var Matiere = sequelize.define('Matiere', {
  nom: {type: Sequelize.STRING, unique: false},
  description: {type : Sequelize.TEXT, allowNull : true}
},
{
  instanceMethods: {
    getInfos: function(){
      return [this.nom, this.description].join(' ')
    }
  }
})

var Filiere = sequelize.define('Filiere', {
  nom: {type: Sequelize.STRING, unique: true}
  //description: Sequelize.TEXT
},
{
  instanceMethods: {
    getInfos: function(){
      return [this.nom]
    }
  }
})

var Enseignement = sequelize.define('Enseignement', {
  nom: {type: Sequelize.STRING, unique: false},
  typeEnseignement: {type : Sequelize.STRING, allowNull : true},
  dureeEnseignement: {type : Sequelize.FLOAT},
  dureeSeanceEnseignement: {type : Sequelize.STRING},
  nombreSeanceParSemaine: {type : Sequelize.FLOAT},
  dateDebut: {type : Sequelize.STRING}

});

var Seance = sequelize.define('Seance', {
  title: {type: Sequelize.STRING, unique: false},
  start: {type : Sequelize.STRING},
  end: {type : Sequelize.STRING},
  professeur: {type : Sequelize.STRING},
  salle : {type : Sequelize.STRING},
  dow : { type : Sequelize.STRING},
  rangeStart : { type : Sequelize.STRING},
  rangeEnd : { type : Sequelize.STRING},
  duree: {type : Sequelize.FLOAT}

});

//Définitions des associations
Filiere.hasMany(Matiere);
Matiere.belongsTo(Filiere);
Matiere.hasMany(Enseignement);
Enseignement.belongsTo(Matiere);
Enseignement.hasMany(Seance);
Seance.belongsTo(Enseignement);

//Synchronisation de la base de données
sequelize.sync();

//Rendu de l'index.html
app.get('/', function(req, res) {
  res.render('index');
});


//Récupere les matieres en base de données
app.get('/matiere', function(req,res){
  Matiere.findAll().then(function (mats){
    res.send(mats);
  });

});

//Récupere une matiere
app.get('/matiere/:id', function(req,res){
  res.send("matiere " + req.params.id);
});

//Récupere les enseignements en base de données
app.get('/enseignement', function(req,res){
  Enseignement.findAll().then(function (enseignement){
    res.send(enseignement);
  });
});

//Récupere un enseignement
app.get('/enseignement/:id', function(req,res){});

//Récupere les filieres en base de données
app.get('/filiere', function(req,res){
  Filiere.findAll().then(function (fils){
    res.send(fils);
  });
});

app.get('/filiere/:id', function(req,res){});

//Création d'une filiere avec le nom passé en parametre
app.post('/creerFiliere', function(req, res){
  var filierePost = Filiere.build({ nom: req.body.nomFiliere});
  console.log(req.body.nomFiliere);
  filierePost.save().then(function( filierePost){
    console.log("SAUVEGARDE DE : " + filierePost);
    res.redirect('/');
  });

});


//Création d'un enseignement
app.post('/creerEnseignement', function(req, res){
  var matierePost = req.body.matiere;
  var nomEnseignement = req.body.nom_enseignement;
  var dureeEnseignement = req.body.duree_enseignement;
  var dureeSeanceEnseignement = req.body.duree_seance_enseignement;
  var nbSeanceSemaine = req.body.nb_seance_semaine_enseignement;
  var dateDebutEnseignement = req.body.date_deb_enseignement;
  dateDebutEnseignement += ":00";
  var parse = dureeSeanceEnseignement.split(':');
  var nombreSeance = dureeEnseignement / ((parseFloat(parse[0])) + (((parseFloat(parse[1]))/60)));
  var salleSeance = "112";
  var prof = "fafa";
  var dureeSeance = 3;
  var dateSplit = dateDebutEnseignement.split('T');
  //console.log(dateSplit[1]);
  var minuteSplit = dateSplit[1].split(':');
  var heure = parseFloat(minuteSplit[0])+parseFloat(parse[0]);
  var minute = parseFloat(minuteSplit[1])+parseFloat(parse[1]);
  var dateFinEnseignement = dateSplit[0]+"T"+heure+":"+minute+":00";
  var lundi = req.body.Lundi;
  var mardi = req.body.Mardi;
  var mercredi = req.body.Mercredi;
  var jeudi = req.body.Jeudi;
  var vendredi = req.body.Vendredi;
  var samedi = req.body.Samedi;
  var listeSemaine = [lundi,mardi,mercredi,jeudi,vendredi,samedi];
  var jourSemaine = "[";
  for(var i=0;i<listeSemaine.length;i++){
    if(listeSemaine[i] != undefined){
      console.log(listeSemaine[i]);
      jourSemaine += listeSemaine[i];}
    }
    jourSemaine += "]";

    var nbSemaine = nombreSeance / nbSeanceSemaine;
    var dateFinRange = nbSemaine*7;

    var split_date = dateSplit[0].split('-');
    // Les mois vont de 0 a 11 donc on enleve 1, cast avec *1
    var new_date = new Date(split_date[0], split_date[1]*1 - 1, split_date[2]*1 + dateFinRange);
    var new_day = new_date.getDate();
    new_day = ((new_day < 10) ? '0' : '') + new_day; // ajoute un zéro devant pour la forme
    var new_month = new_date.getMonth() + 1;
    new_month = ((new_month < 10) ? '0' : '') + new_month; // ajoute un zéro devant pour la forme
    var new_year = new_date.getYear();
    new_year = ((new_year < 200) ? 1900 : 0) + new_year; // necessaire car IE et FF retourne pas la meme chose
    var new_date_text = new_year + '-' + new_month + '-' + new_day;


    console.log('nb semaine :'+nbSemaine);
    var RangeDateDeb = '"'+dateSplit[0]+'"';

    var RangeDateFin = '"'+new_date_text+'"';
    //var Range = "[{"+RangeDateDeb+", "+RangeDateFin+"}]";
    console.log(dateFinEnseignement);
    console.log('Matiere selectionné ' + req.body.matiere);
    console.log('Nom de l\'enseignement ' +  req.body.nom_enseignement);
    console.log(' Durée de l\'enseignement ' + req.body.duree_enseignement);
    console.log('Duree seance enseignement ' + req.body.duree_seance_enseignement);
    console.log('Nombre seance semaine enseignement ' + req.body.nb_seance_semaine_enseignement);
    console.log('Date debut enseignement ' + req.body.date_deb_enseignement);
    //var filierePost = req.body.filiere;
    console.log(parse[0]+" : "+parse[1]);
    console.log('Nb de seance ' + nombreSeance);
    console.log(jourSemaine);

    Matiere.findOne({where:{nom: matierePost}}).then(function(matiere){

      console.log(" Good Matiere : " + matiere);
      Enseignement.create({nom : nomEnseignement, dureeEnseignement : dureeEnseignement, dureeSeanceEnseignement : dureeSeanceEnseignement, nombreSeanceParSemaine :nbSeanceSemaine, dateDebut : dateDebutEnseignement}).then(function (enseignement) {
        return enseignement.setMatiere(matiere);
      }).then(function(enseignement){
        console.log('DANS FUNCTION CREATION SEANCE');
        //  var dateFinEnseignement = new date("dateDebutEnseignement");
        //  dateFinEnseignement = dateFinEnseignement.getDate()+1;
        //console.log('YOUHOU');
        //console.log('date de fin de seance ' + dateFinEnseignement);
        Seance.create({title : nomEnseignement, start : dateDebutEnseignement, end : dateFinEnseignement, professeur : prof, salle : salleSeance, duree : dureeSeance, dow : jourSemaine, rangeStart : RangeDateDeb, rangeEnd : RangeDateFin})
        .then(function(seance){
          console.log("Creation SEANCE ");
          return seance.setEnseignement(enseignement);
        })
      });
      res.redirect('/');
    });
  });

  //Récupére toutes les seances
  app.get('/seances', function(req, res){
    Seance.findAll().then(function(seances){
      res.send(seances);
    });
  });

  //Récupére une séance avec le nom en parametre
  app.get('/seance/:nom', function(req, res){
    var nomSeance = req.params.nom;

    console.log("Nom de la seance : " +  nomSeance);

    Seance.findOne({where : { title : nomSeance}}).then(function(seance){
      res.send(seance);
    })

  });

  //Met à jour une seance
  app.put('/Updateseance/:nomSeance/:professeurSeance/:salleSeance', function(req, res){
    console.log("blablablablablbalbal");
    var nomSeance = req.params.nomSeance;
    var nomProf = req.params.professeurSeance;
    var nomSalle = req.params.salleSeance;
    //  var nomDuree = req.params.duree;
    console.log("Nom de la seance : " +  nomSeance);
    console.log("Nom prof : " +  nomProf);
    console.log("Nom de la salle : " +  nomSalle);

    Seance.findOne({
      where: {
        title: nomSeance
      }
    }).then(function(seance) {
      if(seance){
        seance.updateAttributes({
          professeur: nomProf,
          salle: nomSalle
        }).then(function(seance) {
          console.log('FINISH UPDATE');
          res.send(seance);
        });
      }
    });
  });

  //Création d'une matiere
  app.post('/creerMatiere', function(req, res){
    console.log(req.body.nomMatiere);
    console.log(req.body.filiere);

    Filiere.findOne({where:{nom: req.body.filiere}}).then(function(filiere){
      Matiere.create({nom : req.body.nomMatiere}).then(function (matiere) {
        console.log(" Good Filiere : " + filiere);
        return matiere.setFiliere(filiere);
      });
      res.redirect('/');
    });
  });

  //Supprime une matiere avec le nom donné en parametre
  app.delete('/supprimerMatiere/:Suppmatiere', function(req, res){
    var nomMatiere = req.params.Suppmatiere;
    var idMatiere;
    console.log('MATIERE : ' + nomMatiere + ' avec ID : ' + nomMatiere.id);



    Matiere.findOne({where:{nom: nomMatiere}}).then(function(matiere){
      Enseignement.findAll({where:{Matiereid: matiere.id}}).then(function(enseignement){

        console.log('DANS RECHERCHE ENSEIGNEMENT');
        for(var i = 0; i < enseignement.length; i++){
          Seance.destroy({
            where: {
              EnseignementId : enseignement[i].id,
            }
          });
        }
      }).then(function(){
        idMatiere = matiere.id;
        console.log('ID DE LA MATIERE ' + matiere.id);
        if(nomMatiere != null){
          console.log('DANS LA BOUCLE ID MATIERE VAUT : ' + idMatiere);
          Enseignement.destroy({
            where: {
              Matiereid: matiere.id,
            }
          }).then(function(){
            console.log('la matiere : ' + nomMatiere + ' est supprimé de la base de donnée, now removing Enseignement...');
            //res.redirect('/');
            Matiere.destroy({
              where : {
                nom : nomMatiere,
              }
            });

          })

        }
        else {
          console.log('Le parametre est null, pas de suppresion ! Valeur : ' + nomMatiere);
          res.redirect('/');
        }

      })
    })
  });

  //Supprime une filiere avec le nom donné en parametre
  app.delete('/supprimerfiliere/:Suppfiliere', function(req, res){
    var nomFiliere = req.params.Suppfiliere;
    if(nomFiliere != null){
      Filiere.destroy({
        where: {
          nom: nomFiliere,
        }
      }).then(function(){
        console.log('la filiere : ' + nomFiliere + ' est supprimé de la base de donnée');
        res.redirect('/');
      });
    }
    else {
      console.log('Le parametre est null, pas de suppresion ! Valeur : ' + nomFiliere);
      res.redirect('/');
    }
  });



  //Supprime un enseignement avec le nom donné en parametre
  app.delete('/supprimerEnseignement/:Suppenseignement', function(req, res){
    var nomEnseignement = req.params.Suppenseignement;
    if(nomEnseignement != null){
      Enseignement.destroy({
        where: {
          nom: nomEnseignement,
        }
      }).then(function(){
        console.log('l enseignement : ' + nomEnseignement + ' est supprimé de la base de donnée, now removing SEANCE');
        //res.redirect('/');
        Seance.destroy({
          where: {
            title : nomEnseignement,
          }
        }).then(function(){
          console.log('SEANCE : ' + nomEnseignement + ' Supprimé de la base de donnée')
          res.redirect('/');
        })
      });
    }
    else {
      console.log('Le parametre est null, pas de suppresion ! Valeur : ' + nomEnseignement);
      res.redirect('/');
    }
  });

  http.createServer( app ).listen(3000, function (){
    console.log( 'Express server listening on port 3000 ');
  });
