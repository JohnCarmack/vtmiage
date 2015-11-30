$(document).ready(function() {

    $('#calendar').fullCalendar({
      defaultDate : moment(),
        header: {
        left: 'prevYear,nextYear, prev,next, today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay',
		},
		businessHours: true,
		editable: true,
		events:'/seances' /*[
        {
            title: 'My Event',
            start: '2015-11-12',
        },{
        title: 'AHAHAH',
        start: '2015-11-28',
        }
    ]*/,
    /*eventDataTransform: function (rawEventData) {
                       return {
                           id: rawEventData.id,
                           title: rawEventData.nom,
                           start: rawEventData.dateDebut,
                           end: rawEventData.dateFin,
                        //   url: rawEventData.url
                       };
                   }*/
    eventRender: function(event, element, view){
  //    console.log(event.rangeStart);
    //  console.log(event.rangeEnd);
    //  return (event.filter(function(){ // test event against all the ranges

          return (event.start.isBefore(event.rangeEnd) &&
                   event.end.isAfter(event.rangeStart));

      //  }).length)>0; //if it isn't in one of the ranges, don't render it (by returning false)
      },
		eventClick: function(calEvent, jsEvent, view) {
		document.getElementById('nomSeance').placeholder=calEvent.title;
    document.getElementById('professeurSeance').value = calEvent.professeur;
    document.getElementById('salleSeance').value = calEvent.salle;
        document.getElementById('LienSeance').click();

        // change the border color just for fun
        //$(this).css('border-color', 'red');

    }

  });

$.ajax({url: "/matiere", success: function(result){ // putting "admin" need to be the pseudo log
 	// document.cookie ="username="+result[0].userName;
 	 // alert(result.toJSON());
//console.log(result.fulfillmentValue[0].nom);
              for (i = 0; i< result.length; i++){
           document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].innerHTML +=
	"<option>"+result[i].nom+"</option>";
			document.getElementById('SupprimerMatiere').getElementsByTagName('select')[0].innerHTML +=
			  "<option>"+result[i].nom+"</option>";
			  document.getElementById('ConsulterMatiere').getElementsByTagName('select')[0].innerHTML +=
			  "<option>"+result[i].nom+"</option>";
              }

        }});

$.ajax({url: "/filiere", success: function(result){ // putting "admin" need to be the pseudo log
 	// document.cookie ="username="+result[0].userName;
 	 // alert(result.toJSON());
//console.log(result.fulfillmentValue[0].nom);
              for (j = 0; j< result.length; j++){
           document.getElementById('CreerMatiere').getElementsByTagName('select')[0].innerHTML +=
	"<option>"+result[j].nom+"</option>";
			document.getElementById('SupprimerFiliere').getElementsByTagName('select')[0].innerHTML +=
			"<option>"+result[j].nom+"</option>";
			document.getElementById('ConsulterFiliere').getElementsByTagName('select')[0].innerHTML +=
			"<option>"+result[j].nom+"</option>";
              }

        }});

$.ajax({url: "/enseignement", success: function(result){ // putting "admin" need to be the pseudo log
 	// document.cookie ="username="+result[0].userName;
 	 // alert(result.toJSON());
//console.log(result.fulfillmentValue[0].nom);
              for (x = 0; x< result.length; x++){
			document.getElementById('SupprimerEnseignement').getElementsByTagName('select')[0].innerHTML +=
			  "<option>"+result[x].nom+"</option>";
			  document.getElementById('ConsulterEnseignement').getElementsByTagName('select')[0].innerHTML +=
			  "<option>"+result[x].nom+"</option>";
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

function modifierSeance(){
var nomSeance = document.getElementById('nomSeance').placeholder;
var nomProf = document.getElementById('professeurSeance').value;
var salleSeance = document.getElementById('salleSeance').value;
console.log('NOM SEANCE ' + nomSeance);
  $.ajax({url: "/Updateseance/" + nomSeance + "/"+ nomProf + "/" + salleSeance, type:"PUT", success: function(result){alert('Vous avez bien modifié la séance ' + nomSeance);}});
}

function supprimerMatiere(){
	var nom = document.getElementById('Suppmatiere').value;
	$.ajax({url: "/supprimerMatiere/" + nom , type:"DELETE", success: function(result){alert('Vous avez bien supprimé la matière ' + nom);}});
}

function supprimerFiliere(){
	var nom = document.getElementById('Suppfiliere').value;
	$.ajax({url: "/supprimerfiliere/" + nom, type:"DELETE", success: function(result){alert('Vous avez bien supprimé la filière ' + nom);}});
}

function supprimerEnseignement(){
	var nom = document.getElementById('Suppenseignement').value;
	$.ajax({url: "/supprimerEnseignement/" + nom, type:"DELETE", success: function(result){/*alert('Vous avez bien supprimé l\'enseignement ' + nom);*/console.log(result);}});
}

function consulterEnseignement(){
	$.ajax({url: "/seancesByEnseignement", type:"GET", success: function(result){$('#calendar').fullCalendar( 'removeEvents'); $('#calendar').fullCalendar('addEventSource', result );}});
}

function consulterMatiere(){
	$.ajax({url: "/seancesByMatiere", type:"GET", success: function(result){$('#calendar').fullCalendar( 'removeEvents'); $('#calendar').fullCalendar('addEventSource', result );}});
}

function consulterFiliere(){
	$.ajax({url: "/seancesByFiliere", type:"GET", success: function(result){$('#calendar').fullCalendar( 'removeEvents'); $('#calendar').fullCalendar('addEventSource', result );}});
}

function NomEnseignementExam(){
	if(document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].value != ""){
			document.getElementById('nom_enseignement').value= document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].value + " - Examen";
	}
}

function NomEnseignementCM(){
	if(document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].value != ""){
		document.getElementById('nom_enseignement').value= document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].value + " - CM";
	}
}

function NomEnseignementTD(){
	if(document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].value != ""){
		document.getElementById('nom_enseignement').value= document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].value + " - TD";
	}
}

function NomEnseignementSelect(){
	if(document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].value != "" && document.getElementById('CM').checked==true ){
		document.getElementById('nom_enseignement').value= document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].value + " - CM";
	}
	if(document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].value != "" && document.getElementById('TD').checked==true ){
		document.getElementById('nom_enseignement').value= document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].value + " - TD";
	}
	if(document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].value != "" && document.getElementById('Exam').checked==true ){
		document.getElementById('nom_enseignement').value= document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].value + " - Examen";
	}
}
