function sendtodb(nr,lati,longi,dist)
{
	alert("sendtodb");
$.ajax({
					type:"GET",
					//url:"http://b87861e85ebd401b9ccbafd684d5167b.cloudapp.net/oulu.svc/members",
					//url:"http://localhost/test.txt",
					url:"http://circant.be/project/test_data.php",
					data: { nr : nr,lat : lati,lon:longi,dis:dist },
					success: function(data,status)
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