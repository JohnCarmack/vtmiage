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
              //console.log(result.fulfillmentValue[i].nom);
              //console.log(result[i].diagrammeName);
              //   $("tbody:nth-child(4)")
           document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].innerHTML += 
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
           document.getElementById('CreerMatiere').getElementsByTagName('select')[0].innerHTML += 
	"<option>"+result.fulfillmentValue[j].nom+"</option>";
			
              }
         
        }});		
		
});

