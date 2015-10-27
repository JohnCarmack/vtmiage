$(document).ready(function() {

    $('#calendar').fullCalendar({
        header: {
        left: 'prevYear,nextYear, prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
		}
		
    })

$.ajax({url: "/matiere", success: function(result){ // putting "admin" need to be the pseudo log
 	// document.cookie ="username="+result[0].userName;
 	 // alert(result.toJSON());
//console.log(result.fulfillmentValue[0].nom);
              for (i = 0; i< result.fulfillmentValue.length; i++){
              //console.log(result.fulfillmentValue[i].nom);
              //console.log(result[i].diagrammeName);
              //   $("tbody:nth-child(4)")
           document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].innerHTML += //"<tr>"+
		//"<th>"+"Edition"+"</th>"+
		//"<th>"+"Suppression"+"</th>"+
		//"<th>"+"N°"+"</th>"+
		//"<th>"+"Diagrammes"+"</th>"+
	//"</tr>"+
	"<option>"+result.fulfillmentValue[i].nom+"</option>";
              }
         
        }});	

$.ajax({url: "/filiere", success: function(result){ // putting "admin" need to be the pseudo log
 	// document.cookie ="username="+result[0].userName;
 	 // alert(result.toJSON());
//console.log(result.fulfillmentValue[0].nom);
              for (j = 0; j< result.fulfillmentValue.length; j++){
              //console.log(result.fulfillmentValue[j].nom);
              //console.log(result[i].diagrammeName);
              //   $("tbody:nth-child(4)")
           document.getElementById('CreerMatiere').getElementsByTagName('select')[0].innerHTML += //"<tr>"+
		//"<th>"+"Edition"+"</th>"+
		//"<th>"+"Suppression"+"</th>"+
		//"<th>"+"N°"+"</th>"+
		//"<th>"+"Diagrammes"+"</th>"+
	//"</tr>"+
	"<option>"+result.fulfillmentValue[j].nom+"</option>";
		 document.getElementById('ConsulterFiliere').getElementsByTagName('select')[0].innerHTML +=
	"<option>"+result.fulfillmentValue[j].nom+"</option>";
              }
         
        }});		
		
});

// function creerfiliere(){
	// $.post("/creerFiliere",
	// {
		// nom: document.getElementById("creerFiliere").getElementsByTagName("input")[0].value,
	// },
		// function(data, status){
			// console.log(data,"succés");
		// }
	// );
// }

function creerMatiere(){
	$.post("/creerMatiere",
	{
		filiere: document.getElementById("creerMatiere").getElementsByTagName("input")[0].value,
		nom: document.getElementById("creerMatiere").getElementsByTagName("input")[1].value,
	},
		function(data, status){
			console.log(data,"succés");
		}
	);
}
	

