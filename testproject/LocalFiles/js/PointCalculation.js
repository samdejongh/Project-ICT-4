    var checkpointlon = new Array();
    var checkpointlat = new Array();
    var checkpoints = 5;
    var distance;
    var routelenght=1;
function points()
{
	var angle=80
    var LonInit =Current_lng;//start lat lon
    var LatInit =Current_lat;//start lat lon
    distance = routelenght/(2*Math.PI); 
	if(angle<90)
    {
        var anglerad=angle*(Math.PI/180);    
        var xcomponent = -(distance * Math.sin(anglerad));
        var ycomponent = Math.cos(anglerad) * distance;
    }

    if(angle>90 && angle<180)
    {
        var anglerad=(angle-90)*(Math.PI/180);      
        var xcomponent = -(distance * Math.cos(anglerad));
        var ycomponent=-(Math.sin(anglerad)*distance);
    }

    if(angle>180 && angle<270)
    {
        var anglerad=(angle-180)*(Math.PI/180);
        var xcomponent= Math.sin(anglerad)*distance;
        var ycomponent = -(Math.cos(anglerad) * distance);
    }

    if(angle>270 && angle<360)
    {  
        var anglerad=(angle-270)*(Math.PI/180);
        var xcomponent = Math.cos(anglerad) * distance;
        var ycomponent=Math.sin(anglerad)*distance;
    }

    //so here we change metric components (x and y) to coordinate changes and
    //add them to original coordinates
    var LonCenter = LonInit + (xcomponent * 0.00899); //longitude of centerpoint
    var LatCenter = LatInit + (ycomponent * 0.02050949);//latitude of centerpoint
    var done=1; // just to help moving to next sector in for loop
    //for loop to generete actual checkpoint
    //same tecnic ass in previos but in two stages, first coordinate in cirles
    //ring and then in next stage the actual location of checpoint 
    
    //
//    var checkpointlon = new Array();
//    var checkpointlat = new Array();

    for (i = 0; i < checkpoints; i++)
    {
        
        //looks ugly but this is to move to other "sector" in cirles ring
		var tempvar= (360/checkpoints);
		var checkpointarea= tempvar +(-10+20*Math.random())+(done*tempvar);


		alert(checkpointarea);
        if (checkpointarea < 90)
        {
        	alert("checkpointarea <90");
            var checkpointrad = checkpointarea * (Math.PI / 180);
            var xcomponent = -(distance * Math.sin(checkpointrad));
            var ycomponent = Math.cos(checkpointrad) * distance;
        }


        if (checkpointarea > 90 && checkpointarea < 180)
        {
        	alert("checkpointarea > 90 && checkpointarea < 180");
            var checkpointrad = (checkpointarea - 90) * (Math.PI / 180);
            var xcomponent = -(distance * Math.cos(checkpointrad));
            var ycomponent = -(Math.sin(checkpointrad) * distance);
        }


        if (checkpointarea > 180 && checkpointarea < 270)
        {
        	alert("checkpointarea > 180 && checkpointarea < 270");
            var checkpointrad = (checkpointarea - 180) * (Math.PI / 180);
            var xcomponent = Math.sin(checkpointrad) * distance;
            var ycomponent = -(Math.cos(checkpointrad) * distance);
        }

        if (checkpointarea > 270 && checkpointarea < 360)
        {
        	alert("checkpointarea > 270 && checkpointarea < 360");
            var checkpointrad = (checkpointarea - 270) * (Math.PI / 180);
            var xcomponent = Math.cos(checkpointrad) * distance;
            var ycomponent = Math.sin(checkpointrad) * distance;
        }

        var checkpointarealon = LonInit + (xcomponent * 0.00899); //longitude in circle arc
        var checkpointarealat = LatInit + (ycomponent * 0.02050949); //latitude in circle arc
        alert("test");
        var checkpointorientation = 0 + 360 * Math.random(); // random 
        var checkpointdistance = routelenght / 10 * Math.random();
        alert(checkpointorientation);
        if (checkpointorientation < 90)
        {
        	alert("checkpointorientation < 90");
            var checkpointorientationrad = checkpointorientation * (Math.PI / 180);
            var xcomponent = -(checkpointdistance * Math.sin(checkpointorientationrad));
            var ycomponent = Math.cos(checkpointorientationrad) * checkpointdistance;
        }


        if (checkpointorientation > 90 && checkpointorientation < 180)
        {
        	alert("checkpointorientation > 90 && checkpointorientation < 180");
            var checkpointorientationrad = (checkpointorientation - 90) * (Math.PI / 180);
            var xcomponent = -(checkpointdistance * Math.cos(checkpointorientationrad));
            var ycomponent = -(Math.sin(checkpointorientationrad) * checkpointdistance);
        }

        if (checkpointorientation > 180 && checkpointorientation < 270)
        {
        	alert("checkpointorientation > 180 && checkpointorientation < 270");
            var checkpointorientationrad = (checkpointorientation - 180) * (Math.PI / 180);
            var xcomponent = Math.sin(checkpointorientationrad) * checkpointdistance;
            var ycomponent = -(Math.cos(checkpointorientationrad) * checkpointdistance);
        }

        if (checkpointorientation > 270 && checkpointorientation < 360)
        {
        	alert("checkpointorientation > 270 && checkpointorientation < 360");
            var checkpointorientationrad = (checkpointorientation - 270) * (Math.PI / 180);
            var xcomponent = Math.cos(checkpointorientationrad) * checkpointdistance;
            var ycomponent = Math.sin(checkpointorientationrad) * checkpointdistance;
        }

        checkpointlon[i] = checkpointarealon + (xcomponent * 0.00899); //longitude of the checkpoint
        checkpointlat[i] = checkpointarealat + (ycomponent * 0.02050949); //latitude of the checkpoint

        //(i) in matlab means that you save data on matrix, so in every
        //round new data is addet after previouis data
        // example  64.9971   65.0039   65.0098   65.0000   65.0025 so
        // lon are in own matrix and lat in own..
		done=done+1;
    }
    alert("to fysics");
    Fysics();
}


function Fysics() {
		// Deletes all markers in the array by removing references to them
	deleteOverlays();
		 //map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    //This calculates the points for the orienteering guide	
        var lngSpan = northEast.lng() - southWest.lng(); // gives the span of the Current_lngtude (east-west position)
        var latSpan = northEast.lat() - southWest.lat(); // gives the span of the Current_lattude (north-south position)

        for (var i = 0; i < checkpoints; i++) {
        	
            var point = new google.maps.LatLng(checkpointlat[i],checkpointlon[i]);

            PointsArray.push(point);

            markersArray[i] = new google.maps.Marker({
                position: PointsArray[i],
                map: map,
                title: 'Your GPS Location'
            });
        }

    // Add 10 markers to the map at random locations
}

function UserToPointDistance()
{
	var currentlanglong = new google.maps.LatLng(Current_lat,Current_lng);


    for (var i = 0; i < 10; i++) {
	var distance = google.maps.geometry.spherical.computeDistanceBetween(currentlanglong,PointsArray[i]);
	alert("point "+ i + " distance = " + Math.round(distance)+" meters");
	
	CheckPointDistanceClose(distance, i);
	}

}
function deleteOverlays() {
    	for (i in markersArray) 
		{
     		 markersArray[i].setMap(null);
     		 PointsArray[i].setMap(null);
   	    }
		
    markersArray.length = 0;
	PointsArray = [];
	markserArray = [];
  }

function CheckPointDistanceClose(distance, point)
{
	if(distance < 20) //point found
	{
		//play sound
		alert('Punt Gevonden');
		markersArray[point].setMap(null); //delete the marker
		vibrate();
		sound();
	}
	
	else
	{
		alert("Punt te ver");
	}
}
