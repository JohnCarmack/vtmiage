//Graph Menu
var graphMenu = new joint.dia.Graph;

var paperMenu = new joint.dia.Paper({
    el: $('#paper-menu-activite'),
    width: 200,
    height: 270,
    gridSize: 1,
	interactive: { vertexAdd: false },
    model: graphMenu
});


var uml = joint.shapes.uml;
var basic = joint.shapes.basic;


var objets = {

        StartState: new uml.StartState({
        position: { x:35  , y: 20 },
        size: { width: 30, height: 30 },
    }),
	
		Activite: new basic.Rect({
		position: { x: 20, y: 100 },
		size: { width: 75, height: 50 },
		attrs: { rect: { fill: 'white' }, text: { text: 'activity', fill: 'black' } },
	}),
	
		EndState: new uml.EndState({
        position: { x:115  , y: 20 },
        size: { width: 30, height: 30 },
    }),
	
		Barre: new basic.Rect({
		position: { x:115  , y: 125 },
        size: { width: 90, height: 10 },
		attrs: { rect: { fill: 'black' }},
	}),
	
	
		choice :new joint.shapes.basic.Path({
		position: { x:75  , y: 175 },
		size: { width: 50, height: 50 },
		attrs: {
			path: { d: 'M 30 0 L 60 30 30 60 0 30 z' },
		}
	}),	
	
};

_.each(objets, function(o) { graphMenu.addCell(o); });



var link = [
	new uml.Transition({ source: {x:35, y:250}, target: {x: 170, y:250},labels: [ { position: .5, attrs: { text: { text: '' } } }]}),
];

_.each(link, function(l) { graphMenu.addCell(l); });





//Graph principal
var graphActivite = new joint.dia.Graph;

var paperActivite = new joint.dia.Paper({
    el: $('#paper-activite'),
    width: 1200,
    height: 1200,
	gridSize: 20,
    model: graphActivite
});



var states = {

    s0: new uml.StartState({
        position: { x:500 , y: 20 },
        size: { width: 30, height: 30 },
    }),

    s1:new basic.Rect({
		position: { x: 475, y: 100 },
		size: { width: 150, height: 50 },
		attrs: { rect: { fill: 'white' }, text: { text: 'Enregistrer commande', fill: 'black' } },
	}),
	
    s2: new basic.Rect({
		position: { x: 475, y: 200 },
		size: { width: 90, height: 50 },
		attrs: { rect: { fill: 'white' }, text: { text: 'calculer total', fill: 'black' } },
	}),

    s3: new joint.shapes.basic.Path({
		position: { x:485  , y: 300},
		size: { width: 50, height: 50 },
		attrs: {
			path: { d: 'M 30 0 L 60 30 30 60 0 30 z' },
		}
	}),	


    s4: new basic.Rect({
		position: { x: 650, y: 300 },
		size: { width: 170, height: 50 },
		attrs: { rect: { fill: 'white' }, text: { text: 'Demander au responsable', fill: 'black' } },
	}),

    s5: new basic.Rect({
		position: { x: 350, y: 400 },
		size: { width: 125, height: 50 },
		attrs: { rect: { fill: 'white' }, text: { text: 'Expedier le produit', fill: 'black' } },
	}),
	
    s6: new joint.shapes.basic.Path({
		position: { x:485  , y: 400 },
		size: { width: 50, height: 50 },
		attrs: {
			path: { d: 'M 30 0 L 60 30 30 60 0 30 z' },
		}
	}),	
	
    s7: new basic.Rect({
		position: { x: 600, y: 400 },
		size: { width: 120, height: 50 },
		attrs: { rect: { fill: 'white' }, text: { text: 'envoyer courrier', fill: 'black' } },
	}),
	
	s8:new basic.Rect({
		position: { x:475  , y: 500 },
        size: { width: 90, height: 10 },
		attrs: { rect: { fill: 'black' }},
	}),
	
    se: new uml.EndState({
        position: { x:500  , y: 600 },
        size: { width: 30, height: 30 },
    }),

};

var paperSmall = new joint.dia.Paper({
    el: $('#mini-paper'),
    width: 200,
    height: 95,
    model: graphActivite,
    gridSize: 1
});
paperSmall.scale(.10);
paperSmall.$el.css('pointer-events', 'none');



graphActivite.addCells(states);

var transitons = [
    new uml.Transition({ source: { id: states.s0.id }, target: { id: states.s1.id },labels: [ { position: .5, attrs: { text: { text: '' } } }]}),
    new uml.Transition({ source: { id: states.s1.id }, target: { id: states.s2.id },labels: [ { position: .5, attrs: { text: { text: '' } } }]}),
    new uml.Transition({ source: { id: states.s2.id }, target: { id: states.s3.id },labels: [ { position: .5, attrs: { text: { text: '' } } }]}),
    new uml.Transition({ source: { id: states.s3.id }, target: { id: states.s4.id },labels: [ { position: .5, attrs: { text: { text: '' } } }]}),
    new uml.Transition({ source: { id: states.s3.id }, target: { id: states.s5.id },labels: [ { position: .5, attrs: { text: { text: '' } } }]}),
	new uml.Transition({ source: { id: states.s5.id }, target: { id: states.s8.id },labels: [ { position: .5, attrs: { text: { text: '' } } }]}),
	new uml.Transition({ source: { id: states.s4.id }, target: { id: states.s6.id },labels: [ { position: .5, attrs: { text: { text: '' } } }]}),
	new uml.Transition({ source: { id: states.s6.id }, target: { id: states.s7.id },labels: [ { position: .5, attrs: { text: { text: '' } } }]}),
	new uml.Transition({ source: { id: states.s7.id }, target: { id: states.s8.id },labels: [ { position: .5, attrs: { text: { text: '' } } }]}),
	new uml.Transition({ source: { id: states.s8.id }, target: { id: states.se.id },labels: [ { position: .5, attrs: { text: { text: '' } } }]}),
	new uml.Transition({ source: { id: states.s6.id }, target: { id: states.s5.id },labels: [ { position: .5, attrs: { text: { text: '' } } }]}),
];
graphActivite.addCells(transitons);
//--------------------------------------------------------------------------------------
$( "#rec" ).click(function() {
  //alert( JSON.stringify(graph.toJSON()) );
  var graphObj = graphActivite.toJSON();
   //graphObj.userName = "admin" //HERE graphObj.userName = req.cookie.username
   // like that dont need to link User to diagram and i can list stuff...

   graphObj.diagrammeName = nom;

 // var sendInfo = {"diagrammeName" : nom, "cells" : graphActivite.toJSON()};
  $.ajax({
            type: 'post',
            url: '/newDiagramme',
            data: JSON.stringify(graphObj), //JSON.stringify(sendInfo),//JSON.stringify(graphActivite.toJSON()), //Graph is the array that store my diagram in JSON FORMAT
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function (data) {
                console.log("Graph inserted");

            }
        });
});
$(function () {//WOOORKKKK
// var bg = graphActivite.toJSON();
	//read(graph);
	//JSON.stringify(dg);

	   //$.ajax({url: "/diagramme", success: function(result){
              // console.log(result);
              /* graphActivite.fromJSON(result[5]);
               bg = graphActivite.toJSON();
               JSON.stringify(bg);
               console.log(bg);*/
               var id = location.hash.replace(/^#/, '');

	   $.ajax({url: "/diagramme/" + id, success: function(result){
              console.log(result);
               graphActivite.fromJSON(result);
               bg = graphActivite.toJSON();
               JSON.stringify(bg);
               console.log(bg);
        }});	
       	
		//var dg = graph.toJSON();
		//console.log(dg);
		 //bg = graph.toJSON();
		//console.log(bg + "loveeee");
		

    });


function saveJson(){
	var diagramme = JSON.stringify(graphActivite.toJSON());
  	var blob = new Blob([diagramme], {type: "application/json"});
  	saveAs(blob, nom+".json");
}

//-------------------------------------------------------------------------------------
var nom = 'DiagrammeActivite';

paperMenu.on('cell:pointerdblclick', function(cellView, evt, x, y) {
    var clone = cellView.model.clone();
    graphActivite.addCell(clone);
})

var selection;
var tailleActivite;
var tailleTexte;
var widthSelection;
var heightSelection;
var Varcouper = 'null';
var Varcopier = 'null';

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function supprimerInputActivite(){
	var labelActivite = document.getElementById('labelActivite').parentNode; 
	var inputs = labelActivite.getElementsByTagName('input');
	var temp = [];
	for (var p = 0; p < inputs.length; p++) {
		temp.push(inputs[p]);
	}
	inputs = temp;
	for (var p = 0; p < inputs.length; p++) 
	{ 
		inputs[p].parentNode.removeChild(inputs[p]);
	}
}

function removeAside(){
var aside=document.getElementById('propriete');
aside.innerHTML=" ";
}

function creerAsideElement(){
removeAside();
var aside=document.getElementById('propriete');
aside.innerHTML="<form id='propriete'>"+
			"<div class='form-group'>"+
				"<label id='supprimerElement' for='supprimer'>"+"Supprimer:"+"</label>"+
				"<button type='button' class='btn btn-warning btn-xs' aria-label='Ajouter'	onclick='SupprimerElement()'>"+
					"<span class='glyphicon glyphicon-trash' aria-hidden='true'>"+"</span>"+
				"</button>"+
			"</div>"+
			"<div class='form-group'>"+
				"<label id='labelActivite' for='Activité'>"+"Activite"+"</label>"+
			"</div>"+
			"<div class='form-group'>"+
				"<label for='couleur'>"+"Changer la couleur de fond"+"</label>"+
				"<input type='color' id='couleurFond' onchange='InputCouleurFond()'>"+
			"</div>"+
			"<div class='form-group'>"+
				"<label for='couleur'>"+"Changer la couleur de la bordure"+"</label>"+
				"<input type='color' id='couleurBordure' onchange='InputCouleurBordure()'>"+
			"</div>"+
			"<div class='form-group'>"+
				"<label for='couleur'>"+"Changer la couleur de police"+"</label>"+
				"<input type='color' id='couleurPolice' onchange='InputCouleurPolice()'>"+
			"</div>"+
		"</form>";
}

function creerAsideLink(){
removeAside();
var aside=document.getElementById('propriete');
aside.innerHTML="<form id='propriete'>"+
			"<div class='form-group'>"+
				"<label id='labelTexte' for='Texte'>"+"Texte"+"</label>"+
			"</div>"+
			"</form>";
}

paperActivite.on('cell:pointerdblclick', function(cellView, evt, x, y) {
    var cell = cellView.model;
	if(cell.isLink() == true){
	if(selection != null && selection.isLink() == false){
	supprimerInputActivite();

	selection.attr({
		rect:{ 'stroke-dasharray' : 'null'},
		path:{ 'stroke-dasharray' : 'null'}
	});
	}
	
	tailleTexte = cell.get('labels').length;
	
	var form = document.getElementById('propriete');
	form.style.display = 'block';
	
	creerAsideLink();
	
for( var i=0; i<tailleTexte; i++){
var texte = cell.get('labels')[i].attrs.text.text;
var dernierTexte = document.getElementById('labelTexte');
var input = document.createElement('input');
	input.id="texte"+i;
	input.className="form-control  input-sm";
	input.type="text";
	insertAfter(input, dernierTexte);
	input.addEventListener('change', InputTexte, true);
	input.value=texte;
	}
	
	
	selection = cell;
	}
	else{
	creerAsideElement();
	if(selection != null){
	supprimerInputActivite();

	selection.attr({
		rect:{ 'stroke-dasharray' : 'null'},
		path:{ 'stroke-dasharray' : 'null'}
	});
	}
	
	var form = document.getElementById('propriete');
	form.style.display = 'block';
	
	cell.attr({
		rect:{ 'stroke-dasharray' : 8},
		path:{ 'stroke-dasharray' : 8}
	});
	
	var activite = cell.prop('attrs/text/text');
	//for(var i=tailleActivite-1; i>=0; i--){
	var attr = document.getElementById('labelActivite');
	var input = document.createElement('input');
	input.id="activite";
	input.className="form-control  input-sm";
	input.type="text";
	insertAfter(input, attr);
	input.addEventListener('change', InputActivite, true);
	var inputActivite = document.getElementById('activite');
	inputActivite.value=activite;
	//}
	
	
	widthSelection = cell.get('size').width;
	heightSelection = cell.get('size').height;
	selection = cell;
}
})

function InputVideA(){
var dernierActivite = document.getElementById('labelActivite');
var input = document.createElement('input');
	input.id="activite";
	input.className="form-control  input-sm";
	input.type="text";
	insertAfter(input, dernierActivite);
	input.addEventListener('change', InputActivite, true);
}

function InputActivite(){
var valeur = [];
//for( var i=0; i<tailleActivite;i++){
var activite = document.getElementById('activite');
valeur = activite.value;
if(valeur.length * 7 > widthSelection){
selection.resize(valeur.length * 8, heightSelection);
widthSelection = valeur.length * 8;
}
//}
selection.set('text/text',valeur);
selection.attr({
		text:{ 'text' : valeur}
	});
selection.resize(widthSelection + 10, heightSelection);
widthSelection = widthSelection + 10;
}

function InputTexte(){
var valeur = [];
for( var i=0; i<tailleTexte;i++){
var texte = document.getElementById('texte'+i);
valeur = texte.value;
selection.label(i,{ attrs: { text: { text: valeur } } });
}
}

function InputCouleurFond(){
var input = document.getElementById('couleurFond');
var valeur = input.value;
selection.attr({
		rect:{ 'fill' : valeur},
		path:{'fill' : valeur}
	});
}

function InputCouleurBordure(){
var input = document.getElementById('couleurBordure');
var valeur = input.value;
selection.attr({
		rect:{ 'stroke' : valeur},
		path:{'stroke' : valeur}
	});

}

function InputCouleurPolice(){
var input = document.getElementById('couleurPolice');
var valeur = input.value;
selection.attr({
		text:{ 'fill' : valeur}
	});

}

paperActivite.on('blank:pointerclick', function(cellView, evt, x, y) {
 var cell = cellView.model;
 
 if(selection.isLink() == false){
 selection.attr({
		rect:{ 'stroke-dasharray' : 'null'},
		path:{ 'stroke-dasharray' : 'null'}
	});
	
	supprimerInputActivite();
}
 selection = null;
 
 var form = document.getElementById('propriete');
	form.style.display = 'none';
})



//Zoom
var graphScale = 1;

var paperScale = function(sx, sy) {
     paperActivite.scale(sx, sy);
};

function zoomIn(){
    graphScale += 0.1;
    paperScale(graphScale, graphScale);
}

function zoomOut() {
    graphScale -= 0.1;
    paperScale(graphScale, graphScale);
}

//Copier
function copier(){
Varcopier = selection;
}

//Couper
function couper(){
Varcouper = selection;
selection.remove();
}

//Coller
function coller(){
if(Varcopier != 'null' && Varcouper == 'null'){
var cloneCopy = Varcopier.clone();
 cloneCopy.attr({
		rect:{ 'stroke-dasharray' : 'null'}
	});
    graphActivite.addCell(cloneCopy);
Varcopier = 'null';
}

if(Varcouper != 'null' && Varcopier == 'null'){
var cloneColl = Varcouper.clone();
 cloneColl.attr({
		rect:{ 'stroke-dasharray' : 'null'}
	});
    graphActivite.addCell(cloneColl);
Varcouper = 'null';
}

if(Varcouper != 'null' && Varcopier != 'null'){
var cloneColler = Varcopier.clone();
 cloneColler.attr({
		rect:{ 'stroke-dasharray' : 'null'}
	});
    graphActivite.addCell(cloneColler);
var cloneCouper = Varcouper.clone();
 cloneCouper.attr({
		rect:{ 'stroke-dasharray' : 'null'}
	});
    graphActivite.addCell(cloneCouper);
Varcouper = 'null';
Varcopier = 'null';
}
}

//Supprimer le diagramme
function supprimerAll(){
if(confirm('Voulez vous supprimer le diagramme?')){
graphActivite.get('cells').forEach(function(cell) {
    var view = paperActivite.findViewByModel(cell);
	var viewSmall = paperSmall.findViewByModel(cell);
    view.remove();
	viewSmall.remove();
})}
}

function SupprimerElement(){
if(confirm('Voulez vous supprimer la sélection?')){
selection.remove();
	supprimerInputActivite();
 
 selection = null;
 
 var form = document.getElementById('propriete');
	form.style.display = 'none';
}
}

var paper = document.getElementById('paper-activite').getElementsByTagName('svg');
var id = paper[0].id;

function savePNG(){
saveSvgAsPng(document.getElementById(id), nom+".png");
//submit_download_form("png");
// var svg = document.getElementById("v-81");
// var img = svg.toDataURL("image/png");
// document.getElementsByTagName("section").html('<img src="'+img+'"/>');
}

function savePDF(){
var pdf = new jsPDF();
svgElementToPdf(document.getElementById(id),pdf);
pdf.save(nom+'.pdf');
}

function saveJson(){
	var diagramme = JSON.stringify(graphActivite.toJSON());
  var blob = new Blob([diagramme], {type: "application/json"});
  saveAs(blob, nom+".json");
}

function nomActivite(){
var nomPrompt = prompt("Quel est le nom du diagramme?");
nom = nomPrompt;
if(nom == null) 
	nom = "DiagrammeActivite";
}

window.onload = function(){
nomActivite();
}

var fileName = '';
/*
function GetFile(){
  var fileInput = document.getElementById('fileInput');
	fileName = fileInput.value;
	var json = '';
json = fileName;
if(json != ''){
graph.get('cells').forEach(function(cell) {
    var view = paperActivite.findViewByModel(cell);
	var viewSmall = paperSmall.findViewByModel(cell);
    view.remove();
	viewSmall.remove();
})
var jsonParse = JSON.parse(json);
graph.fromJSON(jsonParse);
}
}*/

/*function ImportJson(){
var fileInput=document.getElementById('fileInput');
fileInput.click();
}*/
function GetFile(){
  var fileInput = document.getElementById('fileInput');
	fileName = fileInput.value;
	var json = '';
json = fileName;
if(json != ''){
graphActivite.get('cells').forEach(function(cell) {
    var view = paperActivite.findViewByModel(cell);
	var viewSmall = paperSmall.findViewByModel(cell);
    view.remove();
	viewSmall.remove();
})
console.log(json);
var jsonParse = JSON.parse(json);
graphActivite.fromJSON(jsonParse);
}
}

function ImportJson(){
var fileInput=document.getElementById('fileInput');
fileInput.click();
}
