function trail()
{
	alert("tracking started");
	idnumber=Math.floor((Math.random()*100)+1);
	nIntervId = setInterval(DBconnect, 5000);
	alert("your id is: "+idnumber);
}
function stoptrail()
{
	alert("tracking stoped")
	clearInterval(nIntervId);
}
function DBconnect()
{
	sendtodb(idnumber,Current_lat,Current_lng,"200");
}
function sendtodbpoints(id,nr,lat,lon)
{
	$.ajax({
		type:"GET",
		//url:"http://b87861e85ebd401b9ccbafd684d5167b.cloudapp.net/oulu.svc/members",
		//url:"http://localhost/test.txt",
		url:"http://roge-senne.rhcloud.com/project/test_data.php",//link naar php bestand hier wordt je data naar toe gezonden
		data: { ID : id, pointnr : nr, lat:lat, lon:lon },//php file kan 4 variabelen ontvangen de trip nummer de lati en longi en de totale afstand die gelopen is
		success: function(data,status)//als het gelukt is dit uitvoeren
		{
			//alert(status);
//			var jsArr = JSON.parse(data);
//			for(var i=0;i<jsArr.length;i++)
//			{
//				$("ul").append("<li>"+ jsArr[i].trip+"</li>");
//				
//				}
		},
		error: function(a,b,c){alert("error");}
	
	});
}
function sendtodb(nr,lati,longi,dist)
{
$.ajax({
					type:"GET",
					//url:"http://b87861e85ebd401b9ccbafd684d5167b.cloudapp.net/oulu.svc/members",
					//url:"http://localhost/test.txt",
					url:"http://roge-senne.rhcloud.com/project/test_data.php",//link naar php bestand hier wordt je data naar toe gezonden
					data: { nr : nr,lat : lati,lon:longi,dis:dist },//php file kan 4 variabelen ontvangen de trip nummer de lati en longi en de totale afstand die gelopen is
					success: function(data,status)//als het gelukt is dit uitvoeren
					{
						//alert(status);
//						var jsArr = JSON.parse(data);
//						for(var i=0;i<jsArr.length;i++)
//						{
//							$("ul").append("<li>"+ jsArr[i].trip+"</li>");
//							
//							}
					},
					error: function(a,b,c){alert("error");}
				
				});
}