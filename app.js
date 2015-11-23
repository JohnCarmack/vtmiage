// mongoose setup
//require( './db' );

var express        = require( 'express' );
var http           = require( 'http' );
var path           = require( 'path' );
var fs             = require('fs');
var stylus         = require('stylus');
var session = require('client-sessions');
//var engine         = require( 'jade' );
//var favicon        = require( 'serve-favicon' );
//var cookieParser   = require( 'cookie-parser' );
var bodyParser     = require( 'body-parser' );
//var methodOverride = require( 'method-override' );
var logger         = require( 'morgan' );
//var errorHandler   = require( 'errorhandler' );
var static         = require( 'serve-static' );
//var mongoose = require('mongoose');
var app    = express();
//var routes = require( './routes' );
//var Diagramme = mongoose.model('diagramme','diagramme');
//var User = mongoose.model('User','user');
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




app.use(express.static(__dirname +  '/public'));
// all environments
//app.set( 'port', process.env.PORT || 3001 );
//app.engine( 'html', engine );
app.set( 'views',  __dirname + '/public/' );
//app.set( 'view engine', 'html' );





//app.use( favicon( __dirname + '/public/favicon.ico' ));
app.use( logger( 'dev' ));
app.set('json spaces', 4);
//app.use(methodOverride());
//app.use( cookieParser());
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended : true  }));



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
    nom: {type: Sequelize.STRING, unique: false},
    dateDebut: {type : Sequelize.STRING},
    dateFin: {type : Sequelize.STRING},
    professeure: {type : Sequelize.STRING},
    salle : {type : Sequelize.STRING},
    duree: {type : Sequelize.FLOAT}

});



//var matiere1 = Matiere.build({ nom: 'Math', description: 'analyse numerique pour la fac' });


//filiere1.setMatiere('matiere1');

//myFiliere.setMatiere(myMatiere);


/*var myMatiere = Matiere.find({where :{nom: 'Math'}}).then(
    function(matiere) { console.log("matiere trouvee") },
    function(err) { console.log(err)}
);
*/
//matiere1.save();

//var filiere1 = Filiere.build({ nom: 'M2 Miage APP'});
//filiere1.save();

/*
var myFiliere = Filiere.find({where :{nom: 'M2 Miage APP'}}).then(
    function(filiere) { console.log("filiere trouvee") },
    function(err) { console.log(err)}
);
*/
//sequelize.sync();

Filiere.hasMany(Matiere);
Matiere.belongsTo(Filiere);
Matiere.hasMany(Enseignement);
Enseignement.belongsTo(Matiere);
Enseignement.hasMany(Seance);
Seance.belongsTo(Enseignement);
//myMatiere.setFiliere(myFiliere);
//var mats = Matiere.all();
//var fils = Filiere.all();

sequelize.sync();


app.get('/', function(req, res) {
    res.render('index');
});

app.get('/matiere', function(req,res){
  Matiere.findAll().then(function (mats){
res.send(mats);
//console.log(mats);
  });

});
app.get('/matiere/:id', function(req,res){
    res.send("matiere " + req.params.id);
});

//Récupération des enseignements 
app.get('/enseignement', function(req,res){
  Enseignement.findAll().then(function (enseignement){
res.send(enseignement);
//console.log(fils);
  });
});

//Récupération d'un enseignement
app.get('/enseignement/:id', function(req,res){});

app.get('/filiere', function(req,res){
  Filiere.findAll().then(function (fils){
res.send(fils);
//console.log(fils);
  });
});

app.get('/filiere/:id', function(req,res){});

//Création d'une filiere avec le nom passé en parametre
app.post('/creerFiliere', function(req, res){
var filierePost = Filiere.build({ nom: req.body.nomFiliere});
console.log(req.body.nomFiliere);
filierePost.save().then(function( filierePost){
  console.log("SAUVEGARDE DE : " + filierePost);
  //res.send('Filiere créée !');
  res.redirect('/');
});
//console.log(req.params)
//console.log(req.params.body['nom']);

});


app.post('/creerEnseignement', function(req, res){
var matierePost = req.body.matiere;
var nomEnseignement = req.body.nom_enseignement;
var dureeEnseignement = req.body.duree_enseignement;
var dureeSeanceEnseignement = req.body.duree_seance_enseignement;
var nbSeanceSemaine = req.body.nb_seance_semaine_enseignement;
var dateDebutEnseignement = req.body.date_deb_enseignement;
var nombreSeance = dureeEnseignement / parseFloat(dureeSeanceEnseignement.replace(':','.'));

console.log('Matiere selectionné ' + req.body.matiere);
console.log('Nom de l\'enseignement ' +  req.body.nom_enseignement);
console.log(' Durée de l\'enseignement ' + req.body.duree_enseignement);
console.log('Duree seance enseignement ' + req.body.duree_seance_enseignement);
console.log('Nombre seance semaine enseignement ' + req.body.nb_seance_semaine_enseignement);
console.log('Date debut enseignement ' + req.body.date_deb_enseignement);
//var filierePost = req.body.filiere;
console.log(parseFloat(dureeSeanceEnseignement.replace(':','.')));
console.log(nombreSeance);

//From here i received two variable   : req.body.nameMatiere for the name of the Matiere and
//req.body.nameFiliere that be linked to the Matiere,

Matiere.findOne({where:{nom: matierePost}}).then(function(matiere){

Enseignement.create({nom : nomEnseignement, dureeEnseignement : dureeEnseignement, dureeSeanceEnseignement : dureeSeanceEnseignement, nombreSeanceParSemaine :nbSeanceSemaine, dateDebut : dateDebutEnseignement}).then(function (enseignement) {
console.log(" Good Matiere : " + matiere);
    return enseignement.setMatiere(matiere);

});
res.redirect('/');
});
});

/* var Enseignement = sequelize.define('Enseignement', {
    nom: {type: Sequelize.STRING, unique: false},
    typeEnseignement: {type : Sequelize.STRING, allowNull : true},
    dureeEnseignement: {type : Sequelize.FLOAT},
    dureeSeanceEnseignement: {type : Sequelize.FLOAT},
    nombreSeanceParSemaine: {type : Sequelize.FLOAT},
    dateDebut: {type : Sequelize.STRING}

});*/


//Création d'une matiere avec le nom passé en parametre
/*app.post('/creerMatiere', function(req, res){
var matierePost = Matiere.build({ nom: req.body.nomMatiere});
console.log(req.body.nomMatiere);
//filierePost.save().then(function( filierePost){
  console.log("SAUVEGARDE DE : " + matierePost);
  //res.send('Filiere créée !');
  res.redirect('/');
});*/

app.post('/creerMatiere', function(req, res){
console.log(req.body.nomMatiere);
console.log(req.body.filiere);
//var filierePost = req.body.filiere;

//From here i received two variable   : req.body.nameMatiere for the name of the Matiere and
//req.body.nameFiliere that be linked to the Matiere,

Filiere.findOne({where:{nom: req.body.filiere}}).then(function(filiere){

Matiere.create({nom : req.body.nomMatiere}).then(function (matiere) {
console.log(" Good Filiere : " + filiere);
    return matiere.setFiliere(filiere);

});
res.redirect('/');
});
});

//Matiere.create({nom : req.body.nomMatiere}).then(function (matiere) {
 // return Filiere.create({nom : req.body.filiere}).then(function (filiere) {
//    var goodFiliere = Filiere.findOne().then(function(filiere){
  //  where: {nom: req.body.filiere}

//console.log(" Good Filiere : " + goodFiliere);
  //  return matiere.setFiliere(goodFiliere);
 // });
//});
//res.redirect('/');
//});
// Routes
/*
app.use( routes.current_user );
app.get(  '/',            routes.index );
app.post( '/create',      routes.create );
app.get(  '/destroy/:id', routes.destroy );
app.get(  '/edit/:id',    routes.edit );
app.post( '/update/:id',  routes.update );
*/

/*
 development only
if( 'development' == app.get( 'env' )){
  app.use( errorHandler());
}
*/
http.createServer( app ).listen(3000, function (){
  console.log( 'Express server listening on port 3000 ');
});
