var j=0;
function CheckStreet(point)
{
	geocoder.geocode({'latLng': point}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	      if (results[1]) {
	        //map.setZoom(11);
	    	  PointsArray.push(results[0].geometry.location);
	    	  j++;
	    	  if(j==checkpoints)
	  		{
	  			markertomap();
	  			j=0;
	  		}
	        //infowindow.setContent(results[0].formatted_address);
	        //infowindow.open(map, marker);
	      } else {
	        alert('No results found');
	      }
	    } else {
	    	if(status = "OVER_QUERY_LIMIT")
	    		{
	    			alert("please wait 1 second and try again")
	    		}
	      alert('Geocoder failed due to: ' + status);
	    }
	  });	
}