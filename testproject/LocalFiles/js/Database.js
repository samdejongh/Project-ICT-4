function sendtodb(nr,lati,longi,dist)
{
	alert("sendtodb");
$.ajax({
					type:"GET",
					//url:"http://b87861e85ebd401b9ccbafd684d5167b.cloudapp.net/oulu.svc/members",
					//url:"http://localhost/test.txt",
					url:"http://circant.be/project/test_data.php",//link naar php bestand hier wordt je data naar toe gezonden
					data: { nr : nr,lat : lati,lon:longi,dis:dist },//php file kan 4 variabelen ontvangen de trip nummer de lati en longi en de totale afstand die gelopen is
					success: function(data,status)//als het gelukt is dit uitvoeren
					{
						alert(status);
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