const locations = [
  // { lat: -31.56391, lng: 147.154312 },
];

// const fetch = require('node-fetch');

// declare global variable for map
let map;

// Initialize and add the map
function initMap() {
  // The location of Uluru
  const calgary = { lat: 51.0486, lng: -114.0708 };

  // The map, centered at Uluru
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: calgary,

  });
  google.maps.event.addDomListener(window, "load", initAutocomplete);
  // The marker, looping through the locations array
  for (let marker of locations) {
    new google.maps.Marker({
      position: marker,
      map: map,
    });

  }
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


      function renderPointsList() {
        // loop through the markersData array and create HTML elements for each point
        const pointsList = document.getElementById("points-list-ul");
        pointsList.innerHTML = ''; // Clear the list before adding new items


        markersData.forEach((marker, index) => {
          const li = document.createElement("li");
          const span = document.createElement("span");
          span.innerHTML = `${index + 1}. ${marker.name}&nbsp;`;
          li.appendChild(span);

          const editButton = document.createElement('button');
          editButton.innerHTML = 'Edit';
          editButton.style.border = 'solid 1.5px';
          editButton.style.marginLeft = '10px'; // add margin to create space
          editButton.style.borderColor = 'green';
          editButton.style.padding = '6px 20px';
          editButton.style.borderRadius = '20px';
          editButton.style.backgroundColor = 'transparent';
          editButton.style.color = '#0c649b';
          editButton.style.marginRight = '2px';
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
          editButton.style.marginLeft = '0px'; // add margin to create space
          deleteButton.style.borderColor = 'red';
          deleteButton.style.padding = '6px 20px';
          deleteButton.style.borderRadius = '20px';
          deleteButton.style.backgroundColor = 'transparent';
          deleteButton.style.color = 'red';
          deleteButton.addEventListener('click', () => {
            markersData.splice(index, 1);
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
    button.style.marginLeft = '2px'; // add margin to create space
  });
          listItem.querySelector('span').innerHTML = `${i + 1}. ${markersData[i].name}`;
        }
      }

      renderPointsList();


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
