var j=0;
function CheckStreet(point)
{
	geocoder.geocode({'latLng': point}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	      if (results[1]) {
	        //map.setZoom(11);
	    	  PointsArray.push(results[0].geometry.location);
	    	  j++;
	    	  alert(j);
	    	  if(j==checkpoints)
	  		{
	    		  alert("markertomap");
	  			markertomap();
	  		}
	        //infowindow.setContent(results[0].formatted_address);
	        //infowindow.open(map, marker);
	      } else {
	        alert('No results found');
	      }
	    } else {
	      alert('Geocoder failed due to: ' + status);
	    }
	  });	
}