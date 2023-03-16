// declare global variable for map
let map;

const locations = [
  {lat: 51.4253, lng: -116.1776, name: "Lake Louise"},
  {lat: 51.3271, lng: -116.1818, name: "Moraine Lake"},
  {lat: 51.3921, lng: -116.2292, name: "Plain of Six Glaciers Trail"},
  {lat: 51.2369, lng: -115.8398, name: "Johnston Canyon"},
  {lat: 51.1537, lng: -115.5659, name: "Sulphur Mountain"}
];

const calgaryAttractions = [
  {lat: 50.9216, lng: -114.0854, name: "Fish Creek"},
  {lat: 50.9834, lng: -114.1010, name: "Heritage Park"},
  {lat: 51.0446, lng: -114.0626, name: "Calgary Tower"},
  {lat: 51.0532, lng: -114.0313, name: "Calgary Zoo"},
  {lat: 51.1139, lng: -114.0889, name: "Nose Hill Park"}
];

let searchedLocations = [];

function fitBoundsToLocations(locations) {
  const bounds = new google.maps.LatLngBounds();

  locations.forEach((location) => {
    bounds.extend(location);
  });

  map.fitBounds(bounds);
}
// Initialize and add the map
function initMap() {
  // The location Calgary
  const calgary = { lat: 51.0486, lng: -114.0708 };

  // The map, centered at Calgary
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: calgary,

  });
  google.maps.event.addDomListener(window, "load", initAutocomplete);

  // Add event listener to Banff Hiking Spots link
  const attractionsLink = document.getElementById("attractions-link");

  attractionsLink.addEventListener("click", () => {
    // Clear existing markers and markersData
    markers.forEach((marker) => marker.setMap(null));
    markers = [];
    markersData = [];

    locations.forEach((location) => {
      addLocationToMapAndList(location);
     });
     
    fitBoundsToLocations(locations); 
   });

   // Add event listener to Favourite Calgary Attractions link
  const calgaryAttractionsLink = document.getElementById("calgary-attractions-link");

  calgaryAttractionsLink.addEventListener("click", () => {
    // Clear previous markers from the map
    markers.forEach(marker => marker.setMap(null));

    // Clear the markers and markersData arrays
    markers = [];
    markersData = [];

    // Add Calgary attractions to the map and list
    searchedLocations.forEach(location => {
      addLocationToMapAndList(location);
    });

    // Pan the map to the general locations of the Calgary attractions
    fitBoundsToLocations(searchedLocations);
  });
  }

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

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    // get the places from the search box
    const places = searchBox.getPlaces();

    // clear the input field
    input.value = '';
    input.focus();

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

      // // Add the searched location to the calgaryAttractions array
      // calgaryAttractions = [{ lat, lng, name }];



      // add latitude, longitude, and name to the markersData array
      searchedLocations.push({
        lat,
        lng,
        name,
      });

          // Add the searched location to the map and list
        addLocationToMapAndList({
          lat,
          lng,
          name,
        });

      // log current status of markersData
      console.log("markersData", markersData);

      const mapId = 2;

      let data = { markersData, mapId };
      // do I send the data to the server side using the Fetch API here? Like with the code below
      // convert this to jQuery
      fetch('/api/markers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(response => response.text())
        .then(message => console.log(message))
        .catch(error => console.error(error));


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
      });
      // Create a marker for each place.
      markers.push(marker);
      renderPointsList();

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    renderPointsList(); 
  });
}

let markers = [];

// create an empty array outside the searchBox function to hold the marker data
let markersData = [];

function renderPointsList() {
  // loop through the markersData array and create HTML elements for each point
  const pointsList = document.getElementById("points-list-ul");
  pointsList.innerHTML = ''; // Clear the list before adding new items


  markersData.forEach((marker, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerHTML = `${index + 1}. ${marker.name}`;
    span.style.marginRight = "5px";
    li.appendChild(span);

    const editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.style.border = 'solid 1.5px';
    editButton.style.marginLeft = '10px';
    editButton.style.borderColor = '#0c649b';
    editButton.style.padding = '6px 20px';
    editButton.style.borderRadius = '20px';
    editButton.style.backgroundColor = 'transparent';
    editButton.style.color = '#0c649b';
    editButton.style.marginRight = '2px';
    editButton.style.margintop = '4px';
    editButton.style.marginBottom = '4px';
    editButton.addEventListener('click', () => {
      const newName = prompt("Enter the new name for the marker", marker.name);
      if (newName) {
        marker.name = newName;
        renderPointsList();
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.style.border = 'solid 1.5px';
    editButton.style.marginLeft = '0px';
    deleteButton.style.borderColor = 'red';
    deleteButton.style.padding = '6px 20px';
    deleteButton.style.borderRadius = '20px';
    deleteButton.style.backgroundColor = 'transparent';
    deleteButton.style.color = 'red';
    deleteButton.style.margintop = '4px';
    deleteButton.style.marginBottom = '4px';
    deleteButton.addEventListener('click', () => {
      markersData.splice(index, 1);
      markers[index].setMap(null);
      markers.splice(index, 1);
      renderPointsList();
    });

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    pointsList.appendChild(li);
  });


  for (let i = 0; i < markersData.length; i++) {
    const listItem = pointsList.children[i];
    const buttons = listItem.querySelectorAll('button');
    buttons.forEach((button) => {
    button.style.marginLeft = '2px';
   });
    listItem.querySelector('span').innerHTML = `${i + 1}. ${markersData[i].name}`;
  }
}

function addLocationToMapAndList(location) {
  // Add location to markersData
  markersData.push(location);

  // Create a marker on the map
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });

  // Add the new marker to the markers array
  markers.push(marker);

  // Update the HTML elements
  renderPointsList();
}

