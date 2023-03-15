const locations = [
  { lat: -31.56391, lng: 147.154312 },
  { lat: -33.718234, lng: 150.363181 },
  { lat: -33.727111, lng: 150.371124 },
  { lat: -33.848588, lng: 151.209834 },
  { lat: -33.851702, lng: 151.216968 },
  { lat: -34.671264, lng: 150.863657 },
  { lat: -35.304724, lng: 148.662905 },
  { lat: -36.817685, lng: 175.699196 },
  { lat: -36.828611, lng: 175.790222 },
  { lat: -37.75, lng: 145.116667 },
  { lat: -37.759859, lng: 145.128708 },
  { lat: -37.765015, lng: 145.133858 },
  { lat: -37.770104, lng: 145.143299 },
  { lat: -37.7737, lng: 145.145187 },
  { lat: -37.774785, lng: 145.137978 },
  { lat: -37.819616, lng: 144.968119 },
  { lat: -38.330766, lng: 144.695692 },
  { lat: -39.927193, lng: 175.053218 },
  { lat: -41.330162, lng: 174.865694 },
  { lat: -42.734358, lng: 147.439506 },
  { lat: -42.734358, lng: 147.501315 },
  { lat: -42.735258, lng: 147.438 },
  { lat: -43.999792, lng: 170.463352 },
];

// const fetch = require('node-fetch');

// declare global variable for map
let map;
// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.031 };
  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
    // mapTypeId: "roadmap"
  });
  google.maps.event.addDomListener(window, "load", initAutocomplete);
  // The marker, looping through the locations array
  for (let marker of locations) {
    new google.maps.Marker ({
      position: marker,
      map: map, 
  });
  
}}


window.initMap = initMap;


// implementation search bar
function initAutocomplete() {

  // Create the search box and link it to the UI element.
const input = document.getElementById("pac-input");
const searchBox = new google.maps.places.SearchBox(input);

map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

  let markers = [];
  
  // create an empty array outside the searchBox function to hold the marker data
  let markersData = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    // get the places from the search box
    const places = searchBox.getPlaces();

    // if there are not places, exit the function
    if (places.length == 0) {
      return;
    }

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    // loop through each place
    places.forEach((place) => {
      // check if the place has geometry and location data
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      // get the latitude, longitude, and name of the place
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const name = place.name;

      // add latitude, longitude, and name to the markersData array
      markersData.push({
        lat,
        lng,
        name,
      });

      // log current status of markersData
      console.log("markersData", markersData);

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

     

      // capture the new marker in a marker variable
      const marker = new google.maps.Marker({
        map,
        icon,
        title: place.name,
        position: place.geometry.location,
      })
      // Create a marker for each place.
      markers.push(marker);

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

window.initAutocomplete = initAutocomplete;
