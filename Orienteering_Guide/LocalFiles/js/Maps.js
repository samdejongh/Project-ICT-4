function vibrate()
{
	mosync.bridge.send(["Custom", "Vibrate", "500"]);
}
function sound()
{
	alert("beep1");
	mosync.bridge.send(["Custom", "Beep"]);
}

function initialize() {//laad de map layout en roep de functie startGPS aan
    startGPS();
    	mapOptions = {
        center: new google.maps.LatLng(Current_lat, Current_lng),
        zoom: 17,
        mapTypeControl: false,//optie om de zoom buttons te laten zien
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL//de zoom buttons staan aan
        },
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP//welk type van map je laat zien
    };
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}

function startGPS() {
    if (navigator.geolocation) {//als het toestel dit ondersteunt
        navigator.geolocation.watchPosition(onSuccess, onError, {//start gps
            enableHighAccuracy: true,//dit zorgt er voor dat gps wordt gebruikt ipv cell id
            maximumAge: 30000,//tijd in ms voor er een error wordt gestuurd als het te lang duurt
            timeout: 27000//de tijd tussen de verschillende oproepen om een nieuwe locatie te vinden
        });
        //element.innerHTML = "Searching satelites"
    } else {
        alert("Geolocation is not supported by this browser.");
    }

}
function onSuccess(position) {// als er succesvol een nieuwe locatie is gevonden
    var element = document.getElementById('geolocation');

    Current_lat = position.coords.latitude;
    Current_lng = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    speed = ((Math.round((position.coords.speed * 3.6) * 10) / 10).toFixed(1));
    document.getElementById("speed").innerHTML = speed +" Km/h";
    if(accuracy <= 20)
    	{
			document.getElementById("accuracyt").style.visibility="hidden";
    		if(starttrain == false){
    		MapUpdate();//roep de functie mapUpdate aan
    		}
    	}
    else
    	{

			$('#accuracy').html(accuracy);
    	}
}

function MapUpdate() {//de kaart centreren naar de nieuwe locatie
    if (marker != null) {//de vorige marker verwijderen anders blijven er steeds nieuwe komen
        marker.setMap(null);
    }
    google.maps.event.addListener(map, 'idle', function () {
         bounds = map.getBounds();	 //Returns the visible rectangular region of the map view in geographical coordinates.
         southWest = bounds.getSouthWest(); //Returns the point at the south-west corner of the rectangle in the visible rectangle region of the map view in geographical coordinates
         northEast = bounds.getNorthEast(); //Returns the point at the north-east corner of the rectangle in the visible rectangle region of the map view in geographical coordinates
    });
        var myLatlng = new google.maps.LatLng(Current_lat, Current_lng);
    map.setCenter(myLatlng);//de locatie waar de map zich moet centreren
    map.setZoom(16);
    marker = new google.maps.Marker({
    	Icon : 'images/start.png',
        position: myLatlng,
        map: map,
        title: "You"
    });
}

function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}



