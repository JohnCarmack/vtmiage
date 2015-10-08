$(function () {
 //console.log(req.session.cookie);


 $.ajax({url: "/diagramme/byUser", success: function(result){ // putting "admin" need to be the pseudo log
 	// document.cookie ="username="+result[0].userName;
 	  //alert(document.cookie);
              for (i = 0; i< result.length; i++){
              console.log(result[i].userName);
              console.log(result[i].diagrammeName);
              //   $("tbody:nth-child(4)")
           document.getElementsByTagName('tbody')[0].innerHTML += //"<tr>"+
		//"<th>"+"Edition"+"</th>"+
		//"<th>"+"Suppression"+"</th>"+
		//"<th>"+"N°"+"</th>"+
		//"<th>"+"Diagrammes"+"</th>"+
	//"</tr>"+
	"<tr>"+
		"<td>"+"<a href='UMLmakerActivite.html#"+result[i]._id+"' class='btn btn-success btn-sm'>"+
    "<span class='glyphicon glyphicon-pencil'>"+"</span>"+
		"</a>"+"</td>"+
		"<td>"+"<a href='#' class='btn btn-danger btn-sm'>"+
    "<span class='glyphicon glyphicon-remove'>"+"</span>"+
		"</a>"+"</td>"+
		"<td>"+i+"</td>"+
		"<td>"+result[i].diagrammeName+"</td>"+
	"</tr>";
              }
         
        }});	


    });
/*$(function () {//WOOORKKKK
 var bg = graph.toJSON();
	//read(graph);
	//JSON.stringify(dg);

	   $.ajax({url: "/diagramme", success: function(result){
              console.log(result);
               graph.fromJSON(result[2]);
               bg = graph.toJSON();
               JSON.stringify(bg);
               console.log(bg);
        }});	
		//var dg = graph.toJSON();
		//console.log(dg);
		 //bg = graph.toJSON();
		//console.log(bg + "loveeee");
		

    });
*/