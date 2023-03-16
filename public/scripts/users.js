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
  // const myMapsInfo = function() {
  //   $.ajax({
  //     method: "GET",
  //     url: "/",
  //     success: (maps) => {
  //       for (const property of maps) {
  //         const $propertyElement = createPropertyElement(property);
  //         $map - points - container.prepend($propertyElement);
  //       }
  //     },
  //   });
  // };

  // myMapsInfo();

  // const $mapForm = $(".create-map-form");
  // $mapForm.on("submit", (event) => {
  //   // prevent the default behaviour of browser
  //   event.preventDefault();
  //   // get the data from the form
  //   // add form validation
  //   // urlencode the data
  //   const urlencoded = $mapForm.serialize();
  //   // make an AJAX post request
  //   $.ajax({
  //     method: "POST",
  //     url: "/",
  //     data: urlencoded,
  //     success: (response) => {
  //       myMapsInfo();
  //     },
  //   });

  // });



  //CREATE NEW FUNCTION FOR HTML MY-MAPS OBJECT
  let mapsSQL = {
    map_id: {
      title: "",
      description: "",
      image_url: "",
      user_id: 4,
    }
  };

  // fetch('/api/maps', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(mapsSQL),
  // })
  //   .then(response => response.text())
  //   .then(message => console.log(message))
  //   .catch(error => console.error(error));

  const createMapFormElement = function(maps) {
    console.log("maps", maps);
    return $(`
  <div class="map-info">
    <div class="map-name">
        <div class="map-properties">
          <label for="map-name-text">Name: ${maps.maps.title}</label>
          <label for="description-text">Description: ${maps.maps.description}</label>
          <label for="map-image">Image: ${maps.maps.image_url}</label>
        </div>
        <div class="points-list">
          <form action="/" method="POST" id="create-map-form">
          </form>
        </div>
    </div>
  </div>
`);
  };

  //1. To show the Dialog box for the Creation of new MAP Grid
  $('#exampleModal2').on('show.bs.modal', function(event) {
    // var button = $(event.relatedTarget); // Button that triggered the modal
    // var recipient = button.data('whatever'); // Extract info from data-* attributes
    // // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    // var modal = $(this);
    // modal.find('.modal-title').text('Create New Map ');
    // modal.find('.modal-body input').val(recipient);
  });
  console.log("map-submit-btn", $('#map-submit-btn'));
  $('#map-submit-btn').on('click', function(e) {
    //To get all the values from the controls
    let map_title = $('#map-title').val();
    let map_description = $('#map-description').val();
    let image_url = $('#image-url').val();
    let user_id = 5;
    let sendData = {
      map_title: map_title,
      map_description: map_description,
      image_url: image_url,
      user_id: user_id
    };
    //Ajax Call
    $.ajax({
      url: "/my-maps",
      data: sendData,
      type: "POST",
      success: function(result) {
        $.get("/api/maps/10")
          .done((maps) => {
            console.log("maps", maps);
            const testvar = createMapFormElement(maps);
            $("#maps-wrapper").append(testvar);
          });
      },
      error: function(err) {
        console.log("there was an error", err);
      }
    });
  });
});
