//Graph Menu
var graphMenu = new joint.dia.Graph;

var paperMenu = new joint.dia.Paper({
    el: $('#paper-menu-class'),
    width: 200,
    height: 270,
    gridSize: 1,
	interactive: { vertexAdd: false },
    model: graphMenu
});

var uml = joint.shapes.uml;



var objets = {

    Interface: new uml.Interface({
        position: { x:115  , y: 20 },
        size: { width: 70, height: 70 },
        name: 'Interface',
        attributes: ['-attributes'],
        methods: ['+setAttr()'],
		
    }),

    Abstract: new uml.Abstract({
        position: { x:75  , y: 100 },
        size: { width: 70, height: 70 },
        name: 'Abstract',
        attributes: ['-attributes'],
        methods: ['+setAttr()']
    }),

    Class: new uml.Class({
        position: { x:35  , y: 20 },
        size: { width: 70, height: 70 },
        name: 'Class',
        attributes: ['-attributes'],
        methods: ['+setAttr()']
    }), 


};

_.each(objets, function(o) { graphMenu.addCell(o); });



var link = [
    new uml.Generalization({ source: {x:35, y:180}, target: {x: 170, y:180}}),
    new uml.Implementation({ source: {x:35, y:205}, target: {x: 170, y:205}}),
    new uml.Aggregation({ source: {x:35, y:230}, target: {x: 170, y:230}}),
    new uml.Composition({ source: {x:35, y:255}, target: {x: 170, y:255}})
];

_.each(link, function(l) { graphMenu.addCell(l); });





//Graph principal
var graph = new joint.dia.Graph;

var paperClasse = new joint.dia.Paper({
    el: $('#paper-class'),
    width: 1200,
    height: 1200,
	gridSize: 20,
    model: graph
	
});

/*
function read() {

    $.ajax({
	type: "GET",
	dataType: "json",
	cache: false,
	url: "localhost:3000/diagramme",
	succes: function(jsonString, textStatus, errorThrown) {
	   // graph.clear();
	    console.log(jsonString);
	    graph.fromJSON(jsonString);
	},
	err: function(msg){
	    console.log("errrooor");
	}
    });
}
*/

$( "#rec" ).click(function() {
  //alert( JSON.stringify(graph.toJSON()) );
 var graphObj = graph.toJSON();
   //graphObj.userName = "admin" //HERE graphObj.userName = req.cookie.username
   // like that dont need to link User to diagram and i can list stuff...
   graphObj.diagrammeName = "myDiagramme";
  //var info = {"cells" : bg, "userName" : "admin"};
  $.ajax({
            type: 'post',
            url: '/newDiagramme',
            data: JSON.stringify(graphObj), //graph.toJSON()Graph is the array that store my diagram in JSON FORMAT
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function (data) {
                console.log("Graph inserted");
            }
        });
});

$( "#saveUser" ).click(function() {
   var graphObj = graph.toJSON();
   graphObj.userName = "admin"
  //var SendInfo= {"mail" : "Paris", "password" : "free", "diagramme" : graph.toJSON()};
   /*     $.ajax({
            type: 'post',
            url: '/newUser',
            data: JSON.stringify(SendInfo),
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function (data) {
                console.log("Inserted " +mail + " " + password + " " + SendInfo);
            }
        });*/
});


    $(function () {//WOOORKKKK
 var bg = graph.toJSON();
	//read(graph);
	//JSON.stringify(dg);

		var id = location.hash.replace(/^#/, '');

	   $.ajax({url: "/diagramme/" + id, success: function(result){
              console.log(result);
               graph.fromJSON(result);
               bg = graph.toJSON();
               JSON.stringify(bg);
               console.log(bg);
        }});	
		//var dg = graph.toJSON();
		//console.log(dg);
		 //bg = graph.toJSON();
		//console.log(bg + "loveeee");
		

    });

//-----------------------------------------------------------------------------
var selection;
var tailleAttributs;
var tailleMethodes;
var widthSelection;
var heightSelection;

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function supprimerInputAttribut(){
	var labelAttributs = document.getElementById('labelAttributs').parentNode; 
	var inputs = labelAttributs.getElementsByTagName('input');
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

function supprimerInputMethode(){
	var labelMethodes = document.getElementById('labelMethodes').parentNode; 
	var inputs = labelMethodes.getElementsByTagName('input');
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

paperClasse.on('cell:pointerdblclick', function(cellView, evt, x, y) {
    var cell = cellView.model;
	if(selection != null){
	supprimerInputAttribut();
	supprimerInputMethode();

	selection.attr({
		rect:{ 'stroke-dasharray' : 'null'}
	});
	}
	
	var form = document.getElementById('propriete');
	form.style.display = 'block';
	
	cell.attr({
		rect:{ 'stroke-dasharray' : 8}
	});
	
	var name = cell.get('name');
	var inputName = document.getElementById('Nom');
	inputName.value=name;
	
	var attributs = cell.get('attributes');
	tailleAttributs = attributs.length;
	for(var i=tailleAttributs-1; i>=0; i--){
	var attr = document.getElementById('labelAttributs');
	var input = document.createElement('input');
	input.id="attribut"+i;
	input.className="form-control  input-sm";
	input.type="text";
	insertAfter(input, attr);
	input.addEventListener('change', InputAttribut, true);
	var inputAttribut = document.getElementById('attribut'+i);
	inputAttribut.value=attributs[i];
	}
	
	
	var methodes = cell.get('methods');
	tailleMethodes = methodes.length;
	for(var i=tailleMethodes-1; i>=0; i--){
	var attri = document.getElementById('labelMethodes');
	var inputM = document.createElement('input');
	inputM.id="methodes"+i;
	inputM.className="form-control  input-sm";
	inputM.type="text";
	insertAfter(inputM, attri);
	inputM.addEventListener('change', InputMethode, true);
	var inputMethodes = document.getElementById('methodes'+i);
	inputMethodes.value=methodes[i];
	}
	
	widthSelection = cell.get('size').width;
	heightSelection = cell.get('size').height;
	selection = cell;

})

function InputVideA(){
if(tailleAttributs > 0){
var dernierAttribut = document.getElementById('attribut'+(tailleAttributs-1));}
else{
var dernierAttribut = document.getElementById('labelAttributs');}
var input = document.createElement('input');
	input.id="attribut"+tailleAttributs;
	input.className="form-control  input-sm";
	input.type="text";
	insertAfter(input, dernierAttribut);
	input.addEventListener('change', InputAttribut, true);
	tailleAttributs++;
}

function InputVideM(){
if(tailleMethodes > 0){
var derniereMethode = document.getElementById('methodes'+(tailleMethodes-1));}
else{
var derniereMethode = document.getElementById('labelMethodes');}
var input = document.createElement('input');
	input.id="methodes"+tailleMethodes;
	input.className="form-control  input-sm";
	input.type="text";
	insertAfter(input, derniereMethode);
	input.addEventListener('change', InputMethode, true);
	tailleMethodes++;
}

function InputName(){
var input = document.getElementById('Nom');
var valeur = input.value;
if(valeur.length * 5 > widthSelection){
selection.resize(valeur[i].length * 6, heightSelection);
widthSelection = valeur[i].length * 6;
}
selection.set('name',valeur);
}

function InputAttribut(){
var valeur = [];
for( var i=0; i<tailleAttributs;i++){
var attribut = document.getElementById('attribut'+i);
valeur[i] = attribut.value;
if(valeur[i].length * 5 > widthSelection){
selection.resize(valeur[i].length * 6, heightSelection);
widthSelection = valeur[i].length * 6;
}
}
selection.set('attributes',valeur);
selection.resize(widthSelection, heightSelection + 10);
heightSelection = heightSelection + 10;
}

function InputMethode(){
var valeur = [];
for( var i=0; i<tailleMethodes;i++){
var methode = document.getElementById('methodes'+i);
valeur[i] = methode.value;
if(valeur[i].length * 5 > widthSelection){
selection.resize(valeur[i].length * 6, heightSelection);
widthSelection = valeur[i].length * 6;
}
}
selection.set('methods',valeur);
selection.resize(widthSelection, heightSelection + 10);
heightSelection = heightSelection + 10;

}

function InputCouleurFond(){
var input = document.getElementById('couleurFond');
var valeur = input.value;
selection.attr({
		rect:{ 'fill' : valeur}
	});
}

function InputCouleurBordure(){
var input = document.getElementById('couleurBordure');
var valeur = input.value;
selection.attr({
		rect:{ 'stroke' : valeur}
	});

}

function InputCouleurPolice(){
var input = document.getElementById('couleurPolice');
var valeur = input.value;
selection.attr({
		text:{ 'fill' : valeur}
	});

}

paperClasse.on('blank:pointerclick', function(cellView, evt, x, y) {
 var cell = cellView.model;
 
 cell.attr({
		rect:{ 'stroke-dasharray' : 'null'}
	});
	
	supprimerInputAttribut();
	supprimerInputMethode();
 
 selection = null;
 
 var form = document.getElementById('propriete');
	form.style.display = 'none';
})

//Zoom
var graphScale = 1;

var paperScale = function(sx, sy) {
     paperClasse.scale(sx, sy);
};

function zoomIn(){
    graphScale += 0.1;
    paperScale(graphScale, graphScale);
}

function zoomOut() {
    graphScale -= 0.1;
    paperScale(graphScale, graphScale);
}

//Supprimer le diagramme
function supprimerAll(){
graph.get('cells').forEach(function(cell) {
    var view = paperClasse.findViewByModel(cell);
	var viewSmall = paperSmall.findViewByModel(cell);
    view.remove();
	viewSmall.remove();
})}

function SupprimerElement(){
selection.remove();
}

