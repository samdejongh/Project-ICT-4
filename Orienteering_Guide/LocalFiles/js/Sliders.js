var dist;
var pts;
function sliderdistance(dist)
{
	localStorage.setItem("distance",dist);
}
function sliderpoints(pts)
{
	localStorage.setItem("points",pts);
}
function maxpoints()
{
	var input = document.getElementById("slider-2");
	if(localStorage.getItem("slider_checked") == 'city')
	{
		if(input.value>5)
			{
				input.value=5;
			}
		input.max=5;
		$("#limit").html("Due to limitations <br>of Google Maps<sup>tm</sup> <br>we can't use more than <br>5 points in the city");

	}
	if(localStorage.getItem("slider_checked") == 'forest')
	{
		
		input.max=20;
		$("#limit").html("");
	}
	
}