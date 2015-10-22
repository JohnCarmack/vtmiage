$(document).ready(function() {

    $('#calendar').fullCalendar({
        header: {
        left: 'prevYear,nextYear, prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
		}
		
    })

});

$(function () {
 //console.log(req.session.cookie);
console.log("Test AJAX");

 $.ajax({url: "/matiere", success: function(result){ // putting "admin" need to be the pseudo log
 	// document.cookie ="username="+result[0].userName;
 	  //alert(document.cookie);
              for (i = 0; i< result.length; i++){
              console.log(result[i].nom);
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