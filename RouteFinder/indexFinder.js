
var flightPlanCoordinates = [];
const FlightPlans = [];
var currentColor = "";
var map;
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: 5.339014945335777, lng: -72.39329518370745 },
        mapTypeId: "terrain",
        mapId: 'fb8b42ff3cd08926'
    });

    currentColor = getRandomColor()
    flightPlanCoordinates = JSON.parse(Route1)
    AddRoute();

    currentColor = getRandomColor()
    flightPlanCoordinates = JSON.parse(Route2)
    AddRoute();


    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.

        // Create a new InfoWindow.

        findRoute(mapsMouseEvent.latLng);
    });

}

var startPoint, endPoint;
var markers = [];
var StartCircle, EndCircle;
var posibleStartRoute, posibleEndRoute;

function FindBestRoute() {
    if (StartCircle && EndCircle) {
        var startBounds = StartCircle.getBounds();
        var endBounds = EndCircle.getBounds();
        console.log(startBounds)
        console.log(endBounds)
        console.log(startPoint)
        console.log(endPoint)
        console.log(FlightPlans)
        for (let i = 0; i < FlightPlans.length; i++) {
            for (let j = 0; j < FlightPlans[i].coordinates.length; j++) {
                console.log(FlightPlans[j])
                if (startBounds.contains(FlightPlans[i].coordinates[j]) && !posibleStartRoute) {
                    posibleStartRoute = i + 1;

                }
                if (endBounds.contains(FlightPlans[i].coordinates[j]) && !posibleEndRoute) {
                    posibleEndRoute = i + 1;

                }
            }
        }
        if (posibleStartRoute && posibleEndRoute) {
            alert('La mejor ruta es empezar en la ruta ::' + posibleStartRoute + ':: y terminar en la ruta ::' + posibleEndRoute);
        }
        else {
            alert('No se encontraron rutas')
        }
    }
}

function findRoute(latLng) {
    if (!startPoint) {
        startPoint = new google.maps.LatLng(latLng.lat(), latLng.lng())
        markers.push(new google.maps.Marker({
            position: latLng,
            map,
            title: "punto de inicio",
        }));
        StartCircle = new google.maps.Circle({
            map: map,
            clickable: false,
            // metres
            radius: 50,
            fillColor: '#fff',
            fillOpacity: .6,
            strokeColor: '#313131',
            strokeOpacity: .4,
            strokeWeight: .8,
            center: latLng
        });
        //circle.setOptions({ fillOpacity: 0, strokeOpacity: 0 });
    }
    else if (!endPoint) {
        endPoint = new google.maps.LatLng(latLng.lat(), latLng.lng())
        markers.push(new google.maps.Marker({
            position: latLng,
            map,
            title: "punto final",
        }));
        EndCircle = new google.maps.Circle({
            map: map,
            clickable: false,
            // metres
            radius: 50,
            fillColor: '#fff',
            fillOpacity: .6,
            strokeColor: '#313131',
            strokeOpacity: .4,
            strokeWeight: .8,
            center: latLng
        });
    }
    else {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        StartCircle.setMap(null);
        EndCircle.setMap(null);
        StartCircle = null;
        EndCircle = null;
        startPoint = null;
        endPoint = null;
        markers = [];
    }
}

function AddRoute() {
    flightPlanCoordinates.push(flightPlanCoordinates[0]);
    CreateRoute();
    console.log('route created')
    FlightPlans.push({
        coordinates: flightPlanCoordinates,
        routeNumber: FlightPlans.length + 1,
        routeColor: currentColor
    })
    currentColor = getRandomColor();
    console.log('new color', currentColor)
    flightPlanCoordinates = []

}
function CreateRoute(latLng) {
    if (latLng)
        flightPlanCoordinates.push(latLng);

    flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: currentColor,
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });
    flightPath.addListener('rightclick', function (mev) {
        if (mev.vertex != null && this.getPath().getLength() > 3) {
            flightPlanCoordinates.pop();
            this.getPath().removeAt(mev.vertex);
        }
    });
    console.log('creating route')
    flightPath.setMap(null);
    flightPath.setMap(map);
    console.log('route created')
}
