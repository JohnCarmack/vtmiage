//Graph Menu
var graphMenu = new joint.dia.Graph;

var paperMenu = new joint.dia.Paper({
    el: $('#paper-menu-activite'),
    width: 200,
    height: 270,
    gridSize: 1,
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
	new uml.Transition({ source: {x:35, y:250}, target: {x: 170, y:250}}),
];

_.each(link, function(l) { graphMenu.addCell(l); });





//Graph principal
var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#paper-activite'),
    width: 1200,
    height: 1200,
	gridSize: 20,
    model: graph
});



var states = {

    s0: new uml.StartState({
        position: { x:500 , y: 20 },
        size: { width: 30, height: 30 },
    }),

    s1:new basic.Rect({
		position: { x: 475, y: 100 },
		size: { width: 75, height: 50 },
		attrs: { rect: { fill: 'white' }, text: { text: 'Enregistrer commande', fill: 'black' } },
	}),
	
    s2: new basic.Rect({
		position: { x: 475, y: 200 },
		size: { width: 75, height: 50 },
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
		size: { width: 75, height: 50 },
		attrs: { rect: { fill: 'white' }, text: { text: 'Demander au responsable', fill: 'black' } },
	}),

    s5: new basic.Rect({
		position: { x: 350, y: 400 },
		size: { width: 75, height: 50 },
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
		size: { width: 75, height: 50 },
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
    width: 100,
    height: 100,
    model: graph,
    gridSize: 1
});
paperSmall.scale(.10);
paperSmall.$el.css('pointer-events', 'none');



graph.addCells(states);

var transitons = [
    new uml.Transition({ source: { id: states.s0.id }, target: { id: states.s1.id }}),
    new uml.Transition({ source: { id: states.s1.id }, target: { id: states.s2.id }}),
    new uml.Transition({ source: { id: states.s2.id }, target: { id: states.s3.id }}),
    new uml.Transition({ source: { id: states.s3.id }, target: { id: states.s4.id }}),
    new uml.Transition({ source: { id: states.s3.id }, target: { id: states.s5.id }}),
	new uml.Transition({ source: { id: states.s5.id }, target: { id: states.s8.id }}),
	new uml.Transition({ source: { id: states.s4.id }, target: { id: states.s6.id }}),
	new uml.Transition({ source: { id: states.s6.id }, target: { id: states.s7.id }}),
	new uml.Transition({ source: { id: states.s7.id }, target: { id: states.s8.id }}),
	new uml.Transition({ source: { id: states.s8.id }, target: { id: states.se.id }}),
	new uml.Transition({ source: { id: states.s6.id }, target: { id: states.s5.id }}),
];
graph.addCells(transitons);




//Crée la forme selectionné
paperMenu.on('cell:pointerdblclick', function(cellView, evt, x, y) {
    var clone = cellView.model.clone();
    graph.addCell(clone);
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

//Supprimer le diagramme
function supprimerAll(){
graph.get('cells').forEach(function(cell) {
    var view = paperActivite.findViewByModel(cell);
	var viewSmall = paperSmall.findViewByModel(cell);
    view.remove();
	viewSmall.remove();
})}
	console.log(JSON.stringify(graph));

