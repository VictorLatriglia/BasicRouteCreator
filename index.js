const baseRoute = [
  { "lat": 5.346022487339899, "lng": -72.39572526507494 },
  { "lat": 5.345509743082176, "lng": -72.39666940264819 },
  { "lat": 5.345178595520891, "lng": -72.39717902236102 },
  { "lat": 5.344842106686475, "lng": -72.3978066592705 },
  { "lat": 5.3444308423044475, "lng": -72.39859522872088 },
  { "lat": 5.343987531037916, "lng": -72.39939989142535 },
  { "lat": 5.34348546728838, "lng": -72.4002742915642 },
  { "lat": 5.343383986267734, "lng": -72.40040303759692 },
  { "lat": 5.3426469130870125, "lng": -72.3999685197365 },
  { "lat": 5.342321105094066, "lng": -72.39972175650713 },
  { "lat": 5.341888474540599, "lng": -72.3994803576958 },
  { "lat": 5.3412368575749305, "lng": -72.39902438216326 },
  { "lat": 5.340458112744293, "lng": -72.39859416410984 },
  { "lat": 5.339603530981244, "lng": -72.39816501066746 },
  { "lat": 5.338684854257267, "lng": -72.39810600206913 },
  { "lat": 5.338551325549091, "lng": -72.39790751860203 },
  { "lat": 5.337963798887639, "lng": -72.39755346701206 },
  { "lat": 5.336991708084353, "lng": -72.39752128050388 },
  { "lat": 5.336174509678542, "lng": -72.39684536383213 },
  { "lat": 5.335223780751433, "lng": -72.39673807547153 },
  { "lat": 5.3347430745533595, "lng": -72.39638134167255 },
  { "lat": 5.334638101373762, "lng": -72.3961492303764 },
  { "lat": 5.33483305452173, "lng": -72.39565302170864 },
  { "lat": 5.334945219318517, "lng": -72.39532579220882 },
  { "lat": 5.335086553012478, "lng": -72.39493757486343 },
  { "lat": 5.335351148887897, "lng": -72.3944379810249 },
  { "lat": 5.335703666453942, "lng": -72.39379693307033 },
  { "lat": 5.336157666051158, "lng": -72.39296544827572 },
  { "lat": 5.33660098298068, "lng": -72.39208568371883 },
  { "lat": 5.336830653071177, "lng": -72.39169408120266 },
  { "lat": 5.3369882173858585, "lng": -72.3914124492561 },
  { "lat": 5.33718316978697, "lng": -72.39104766883007 },
  { "lat": 5.337458577173373, "lng": -72.39102120982176 },
  { "lat": 5.338093865709062, "lng": -72.39138685106082 },
  { "lat": 5.338889573363116, "lng": -72.39179139689568 },
  { "lat": 5.339651823959653, "lng": -72.39220753604562 },
  { "lat": 5.340469017731104, "lng": -72.39259645635278 },
  { "lat": 5.34130223378804, "lng": -72.39310339385659 },
  { "lat": 5.342057715031047, "lng": -72.39350562896753 },
  { "lat": 5.3427760950285705, "lng": -72.39389991369272 },
  { "lat": 5.343553226345066, "lng": -72.39430224504495 },
  { "lat": 5.344434508088318, "lng": -72.39477163162256 },
  { "lat": 5.345238342754381, "lng": -72.39523297157312 },
  { "lat": 5.346018809124043, "lng": -72.39572381582285 }
];
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
  });
  currentColor = getRandomColor();
  flightPlanCoordinates = baseRoute;
  AddRoute();

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
  flightPlanCoordinates = []

}

function PopLastPosition() {
  flightPlanCoordinates.pop();
  CreateRoute();
}


function CreateRoute(latLng) {
  if (latLng)
    flightPlanCoordinates.push(latLng);


  console.log(flightPlanCoordinates);

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


