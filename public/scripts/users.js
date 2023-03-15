// Client facing scripts here
// $(() => {
//   $('#fetch-users').on('click', () => {
//     $.ajax({
//       method: 'GET',
//       url: '/api/users'
//     })
//     .done((response) => {
//       const $usersList = $('#users');
//       $usersList.empty();

//       for(const user of response.users) {
//         $(`<li class="user">`).text(user.name).appendTo($usersList);
//       }
//     });
//   });
// });

$(document).ready(function() {
  const myMapsInfo = function() {
    $.ajax({
      method: "GET",
      url: "/my-maps",
      success: (maps) => {
        for (const property of maps) {
          const $propertyElement = createPropertyElement(property);
          $map - points - container.prepend($propertyElement);
        }
      },
    });
  };

  myMapsInfo();

  const $mapForm = $(".create-map-form");
  $mapForm.on("submit", (event) => {
    // prevent the default behaviour of browser
    event.preventDefault();
    // get the data from the form
    // add form validation
    // urlencode the data
    const urlencoded = $mapForm.serialize();
    // make an AJAX post request
    $.ajax({
      method: "POST",
      url: "/my-maps",
      data: urlencoded,
      success: (response) => {
        myMapsInfo();
      },
    });

  });
});

//CREATE NEW FUNCTION FOR HTML MY-MAPS OBJECT

const mapsSQL = {
  map_id: {
    title: "",
    description: "",
    image_url: "",
  }
};

const createMapFormElement = function(maps) {
  return $(`
<section id="map-points-container">
  <div class="map-info">
    <div class="map-name">
        <div class="map-properties">
          <label for="map-name-text">Name: ${maps.map_id.title}</label>
          <label for="description-text">Description: ${maps.map_id.description}</label>
          <label for="map-image">Image: ${maps.map_id.image_url}</label>
        </div>
        <div class="points-list">
          <form action="/my-maps" method="POST" id="create-map-form">
            <div>Point list:</div>
            <span>${locations[lat,lng]}</span>
            <button type="submit" class="edit-btn">Edit</button>
            <button type="submit" class="delete-btn">Delete</button>
          </form>
        </div>
    </div>
  </div>
</section>
`);
};


