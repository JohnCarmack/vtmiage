var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#paper-menu-class'),
    width: 240,
    height: 270,
    gridSize: 1,
    model: graph
});


var uml = joint.shapes.uml;



var classes = {

    Interface: new uml.Interface({
        position: { x:115  , y: 20 },
        size: { width: 70, height: 70 },
        name: 'Interface',
        attributes: ['-attributes'],
        methods: ['+setAttr()']
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

_.each(classes, function(c) { graph.addCell(c); });



var relations = [
    new uml.Generalization({ source: {x:35, y:180}, target: {x: 170, y:180}}),
    new uml.Implementation({ source: {x:35, y:205}, target: {x: 170, y:205}}),
    new uml.Aggregation({ source: {x:35, y:230}, target: {x: 170, y:230}}),
    new uml.Composition({ source: {x:35, y:255}, target: {x: 170, y:255}})
];

_.each(relations, function(r) { graph.addCell(r); });