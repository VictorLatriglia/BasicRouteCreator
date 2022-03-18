var flightPlanCoordinates = [];
const FlightPlans = [];
var map;
var currentColor = "";

var flightPath;


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
    mapId:'fb8b42ff3cd08926'
  });
  currentColor = getRandomColor();
  

  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.

    // Create a new InfoWindow.

    CreateRoute(mapsMouseEvent.latLng);
  });
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
  console.log(JSON.stringify(flightPlanCoordinates));
  flightPlanCoordinates = []

}

function PopLastPosition() {
  flightPlanCoordinates.pop();
  CreateRoute();
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


