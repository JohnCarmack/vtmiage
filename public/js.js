$(document).ready(function() {

    $('#calendar').fullCalendar({
        header: {
        left: 'prevYear,nextYear, prev,next, today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
		}
		
    })

$.ajax({url: "/matiere", success: function(result){ // putting "admin" need to be the pseudo log
 	// document.cookie ="username="+result[0].userName;
 	 // alert(result.toJSON());
//console.log(result.fulfillmentValue[0].nom);
              for (i = 0; i< result.fulfillmentValue.length; i++){
           document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].innerHTML += 
	"<option>"+result.fulfillmentValue[i].nom+"</option>";
              }
         
        }});	

$.ajax({url: "/filiere", success: function(result){ // putting "admin" need to be the pseudo log
 	// document.cookie ="username="+result[0].userName;
 	 // alert(result.toJSON());
//console.log(result.fulfillmentValue[0].nom);
              for (j = 0; j< result.fulfillmentValue.length; j++){
           document.getElementById('CreerMatiere').getElementsByTagName('select')[0].innerHTML += 
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

function NomEnseignement(){
	if(document.getElementById('Exam').checked=true && document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].value != ""){
			document.getElementById('nom_enseignement').value= document.getElementById.getElementsByTagName('select')[0].value + " - Exam";
		}
	if(document.getElementById('CM').checked==true && document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].value != ""){
		document.getElementById('nom_enseignement').value= document.getElementById.getElementsByTagName('select')[0].value + " - CM";
	}
	if(document.getElementById('TD').checked==true && document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].value != ""){
		document.getElementById('nom_enseignement').value= document.getElementById.getElementsByTagName('select')[0].value + " - TD";
	}
}