
function CheckStreet(point)
{
	geocoder.geocode({'latLng': point}, function(results, status) {
		alert("in geocoder system");
	    if (status == google.maps.GeocoderStatus.OK) {
	    	alert("google.maps.GeocoderStatus.OK");
	      if (results[1]) {
	        //map.setZoom(11);
	    	  alert("results[1]");
	    	  PointsArray.push(results[0].geometry.location);
	    	  alert("voorbij push");
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