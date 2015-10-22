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
console.log(result.fulfillmentValue[0].nom);
              for (i = 0; i< result.length; i++){
              console.log(result[i].nom);
console.log("héhooooo");
              //console.log(result[i].diagrammeName);
              //   $("tbody:nth-child(4)")
           document.getElementById('CreerEnseignement').getElementsByTagName('select')[0].innerHTML += //"<tr>"+
		//"<th>"+"Edition"+"</th>"+
		//"<th>"+"Suppression"+"</th>"+
		//"<th>"+"N°"+"</th>"+
		//"<th>"+"Diagrammes"+"</th>"+
	//"</tr>"+
	"<option>"+result[i]._nom+"<option>";
              }
         
        }});	

});

$(function () {
 //console.log(req.session.cookie);
console.log("Test AJAX");

 

    });