var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#paper-menu-etats'),
    width: 240,
    height: 180,
    gridSize: 1,
    model: graph
});


var uml = joint.shapes.uml;

var states = {

    s0: new uml.StartState({
        position: { x:35  , y: 20 },
        size: { width: 60, height: 60 },
    }),

    s1: new uml.State({
        position: { x:115 , y: 20 },
        size: { width: 70, height: 60 },
        name: "state",
        events: ["events()"]
    }),

    se: new uml.EndState({
        position: { x:75  , y: 100 },
        size: { width: 60, height: 60 },
    })

};

graph.addCells(states);

var transitons = new uml.Transition({ source: { x:35 ,y:120 }, target: { x:115 ,y:120 }});

graph.addCells(transitons);