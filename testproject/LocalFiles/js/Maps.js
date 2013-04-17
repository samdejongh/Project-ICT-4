
var Current_lat = 65.012482;
var Current_lng = 25.472181;
var map;
var marker;
var speed;
var PointsArray = [];



var lati = 65.012482;
var longi = 25.472181;
var map;
var marker;
var speed;


function initialize() {//laad de map layout en roep de functie startGPS aan
    startGPS();
    var mapOptions = {
        center: new google.maps.LatLng(Current_lat, Current_lng),
        zoom: 13,
        mapTypeControl: false,//optie om de zoom buttons te laten zien
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL//de zoom buttons staan aan
        },
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP//welk type van map je laat zien
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
	Fysics();
}
function startGPS() {
    alert("gps loaded");//voor debugging
    //var element = document.getElementById('geolocation');//voor debugging
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

    Current_lat = position.coords.Current_lattude
    Current_lng = position.coords.Current_lngtude
    speed = ((Math.round((position.coords.speed * 3.6) * 10) / 10).toFixed(1));
    document.getElementById("speed").innerHTML = 'Speed: ' + speed + ' km/s'//weergeven van de snelheid
    //	element.innerHTML = 'Current_lattude: ' + position.coords.Current_lattude + '</br> '
    //	+ 'Current_lngtude: ' + position.coords.Current_lngtude ;//weergeven van de positie op de pagina
    MapUpdate();//roep de functie mapUpdate aan

	var element = document.getElementById('geolocation');
	
	lati = position.coords.latitude;
	longi =position.coords.longitude;
	speed =((Math.round((position.coords.speed*3.6) * 10) / 10).toFixed(1));
	document.getElementById("speed").innerHTML='Speed: '+speed+' km/s'//weergeven van de snelheid
//	element.innerHTML = 'Latitude: ' + position.coords.latitude + '</br> '
//	+ 'Longitude: ' + position.coords.longitude ;//weergeven van de positie op de pagina
	MapUpdate();//roep de functie mapUpdate aan


}

function MapUpdate() {//de kaart centreren naar de nieuwe locatie
    if (marker != null) {//de vorige marker verwijderen anders blijven er steeds nieuwe komen
        marker.setMap(null);
    }
    var myLatlng = new google.maps.LatLng(Current_lat, Current_lng);
    map.setCenter(myLatlng);//de locatie waar de map zich moet centreren
    map.setZoom(16);
    marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: "You"
    });
}

function onError(error) {
    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}

function Fysics() {
    //This calculates the points for the orienteering guide
    google.maps.event.addListener(map, 'bounds_changed', function () {
        var bounds = map.getBounds();	 //Returns the visible rectangular region of the map view in geographical coordinates.
        var southWest = bounds.getSouthWest(); //Returns the point at the south-west corner of the rectangle in the visible rectangle region of the map view in geographical coordinates
        var northEast = bounds.getNorthEast(); //Returns the point at the north-east corner of the rectangle in the visible rectangle region of the map view in geographical coordinates
        var lngSpan = northEast.lng() - southWest.lng(); // gives the span of the Current_lngtude (east-west position)
        var latSpan = northEast.lat() - southWest.lat(); // gives the span of the Current_lattude (north-south position)

        for (var i = 0; i < 10; i++) {

            var point = new google.maps.LatLng(southWest.lat() + latSpan * Math.random(),
                      southWest.lng() + lngSpan * Math.random());

            PointsArray.push(point);


            new google.maps.Marker({
                position: point,
                map: map,
                title: 'Your GPS Location'
            });
        }

        alert("punt 0 = " + PointsArray[0]);

    });
    // Add 10 markers to the map at random locations
}


function UserToPointDistance()
{
	var currentlanglong = new google.maps.LatLng(Current_lat,Current_lng);
	alert(PointsArray[1]);
	var distance = google.maps.geometry.spherical.computeDistanceBetween(PointsArray[1],PointsArray[0]);
	alert("distance = "+ distance);
	}

function data()
{
	alert("data");
	sendtodb("1",lati,longi,"200");
}

