function Fysics() {
		// Deletes all markers in the array by removing references to them
	deleteOverlays();
		 //map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    //This calculates the points for the orienteering guide	
    
        var lngSpan = northEast.lng() - southWest.lng(); // gives the span of the Current_lngtude (east-west position)
        var latSpan = northEast.lat() - southWest.lat(); // gives the span of the Current_lattude (north-south position)

        for (var i = 0; i < 10; i++) {
        	
            var point = new google.maps.LatLng(southWest.lat() + latSpan * Math.random(),
                      southWest.lng() + lngSpan * Math.random());

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
