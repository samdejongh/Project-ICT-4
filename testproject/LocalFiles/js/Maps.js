
var lati = 65.012482;
var longi = 25.472181;
var map;
var marker;
var speed;
function initialize() {//laad de map layout en roep de functie startGPS aan
	startGPS();
	var mapOptions = {
		center : new google.maps.LatLng(lati, longi),
		zoom : 10,
		mapTypeControl : false,//optie om de zoom buttons te laten zien
		zoomControl : true,
		zoomControlOptions : {
			style : google.maps.ZoomControlStyle.SMALL//de zoom buttons staan aan
		},
		streetViewControl : false,
		mapTypeId : google.maps.MapTypeId.ROADMAP//welk type van map je laat zien
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	document.getElementById("debug").innerHTML = "success initialize";//voor debugging

}
function startGPS() {
	alert("gps loaded");//voor debugging
	var element = document.getElementById('geolocation');//voor debugging
	if (navigator.geolocation) {//als het toestel dit ondersteunt
		navigator.geolocation.watchPosition(onSuccess, onError, {//start gps
			enableHighAccuracy : true,//dit zorgt er voor dat gps wordt gebruikt ipv cell id
			maximumAge : 30000,//tijd in ms voor er een error wordt gestuurd als het te lang duurt
			timeout : 27000//de tijd tussen de verschillende oproepen om een nieuwe locatie te vinden
		});
		element.innerHTML = "searching satelites"
	} else {
		element.innerHTML = "Geolocation is not supported by this browser.";
	}

}
function onSuccess(position) {// als er succesvol een nieuwe locatie is gevonden
	var element = document.getElementById('geolocation');
	element.innerHTML = 'Latitude: ' + position.coords.latitude + ' '
			+ 'Longitude: ' + position.coords.longitude ;//weergeven van de positie op de pagina
	lati = position.coords.latitude;
	longi = position.coords.longitude;
	//speed = Math.round(position.coords.speed);
	speed =(Math.round(position.coords.speed * 10) / 10).toFixed(1)
	document.getElementById("speed").innerHTML='Speed: '+speed+'m/s'//weergeven van de snelheid
	MapUpdate();//roep de functie mapUpdate aan

}

function MapUpdate() {//de kaart centreren naar de nieuwe locatie
	document.getElementById("debug").innerHTML = "success1";
	if (marker != null) {//de vorige marker verwijderen anders blijven er steeds nieuwe komen
		marker.setMap(null);
	}
	document.getElementById("debug").innerHTML = "success2";
	var myLatlng = new google.maps.LatLng(lati, longi);
	map.setCenter(myLatlng);//de locatie waar de map zich moet centreren
	map.setZoom(16);
	document.getElementById("debug").innerHTML = "success3";
	marker = new google.maps.Marker({
		position : myLatlng,
		map : map,
		title : "You"
	});
	document.getElementById("debug").innerHTML = "success4";

}




function onError(error) {
	alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}
function vibrate() {
	mosync.bridge.send([ "Custom", "Vibrate", "500" ]);
}