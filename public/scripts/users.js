$(document).ready(function() {
  //CREATE NEW FUNCTION FOR HTML MY-MAPS OBJECT
  let mapsSQL = {
    map_id: {
      title: "",
      description: "",
      image_url: "",
      user_id: 4,
    }
  };

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
