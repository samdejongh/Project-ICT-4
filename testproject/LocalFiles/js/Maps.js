

	var lati = 65.012482;
	var longi = 25.472181;
	var map;
	var marker;
	function initialize() {
		//mosync.bridge.send(["Custom", "Vibrate", "500"]);
		mosync.bridge.send(["Custom", "Start"]);
		var mapOptions = {
			center : new google.maps.LatLng(lati, longi),
			zoom : 10,
			mapTypeControl : true,
			mapTypeControlOptions : {
				style : google.maps.MapTypeControlStyle.DEFAULT
			},
			zoomControl : true,
			zoomControlOptions : {
				style : google.maps.ZoomControlStyle.SMALL
			},
			streetViewControl : false,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById("map_canvas"),
				mapOptions);
		document.getElementById("debug").innerHTML = "success initialize";
		
	}
	function MapUpdate() {
		document.getElementById("debug").innerHTML = "success1";
		if (marker != null) {
			marker.setMap(null);
		}
		document.getElementById("debug").innerHTML = "success2";
		var myLatlng = new google.maps.LatLng(lati, longi);
		map.setCenter(myLatlng);
		map.setZoom(16);
		document.getElementById("debug").innerHTML = "success3";
		marker = new google.maps.Marker({
			position : myLatlng,
			map : map,
			title : "You"
		});
		document.getElementById("debug").innerHTML = "success4";

	}
	// Wait for Cordova to load
	//

	// onSuccess Geolocation
	//
	function onSuccess(lat, lon) {
		var element = document.getElementById('geolocation');
		element.innerHTML = 'Latitude: ' + lat + '<br />' + 'Longitude: ' + lon
				+ '<br />';
		lati = lat;
		longi = lon;
		MapUpdate();

	}

	function onError(error) {
		alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}
	function vibrate()
	{
		mosync.bridge.send(["Custom", "Vibrate", "500"]);
	}