$(document).ready(function() {
  //CREATE NEW FUNCTION FOR HTML MY-MAPS OBJECT
  let mapsSQL = {
    map_id: {
      title: "",
      description: "",
      image_url: "",
      user_id: 2,
    }
  };

  // HELPER FUNCTION - BROWSER MODAL TITLE + DESCRIPTION
  const createMapFormElement = function(maps) {
    console.log("maps", maps);
    return $(`
    <div class="map-info">
      <div class="map-name">
          <div class="map-properties">
          <ul>
          <li><label for="map-name-text"><b>Name:</b> ${maps.maps.title}</label></li>
          <li><label for="description-text"><b>Description:</b> ${maps.maps.description}</label></li>
          </ul>
          </div>
          <div class="points-list">
            <form action="/" method="POST" id="create-map-form">
            </form>
          </div>
      </div>
    </div>
  `);
  };

  // HELPER FUNCTION - PROFILE MODAL TITLE
  const createMapFormElement2 = function(maps) {
    console.log("maps", maps);
    return $(`
    <div class="map-info">
      <div class="map-name">
          <div class="map-properties">
          <ul>
          <li><label for="map-name-text"></b> ${maps.maps.title}</label></li>
          </ul>
          </div>
          <div class="points-list">
            <form action="/" method="POST" id="create-map-form">
            </form>
          </div>
      </div>
    </div>
  `);
  };

  // BROWSER RENDERING MODAL TITLE + DESCRIPTION
  $('#exampleModal2').on('show.bs.modal', function(event) {
  });
  console.log("map-submit-btn", $('#map-submit-btn'));
  $('#map-submit-btn').on('click', function(e) {
    //To get all the values from the controls
    let map_title = $('#map-title').val();
    let map_description = $('#map-description').val();
    let image_url = $('#image-url').val();
    let user_id = 2;
    let sendData = {
      map_title: map_title,
      map_description: map_description,
      image_url: image_url,
      user_id: user_id
    };
    //Ajax Call
    $.ajax({
      url: "/api/maps",
      data: sendData,
      type: "POST",
      success: function(result) {
        console.log("result", result);
        const mapsWrapper = createMapFormElement(result);
        $("#maps-wrapper").append(mapsWrapper);
        var imageUrl = document.getElementById("image-url").value;
        var image = document.createElement("img");
        image.src = imageUrl;
        $("#image-container").append(image);
      },
      error: function(err) {
        console.log("there was an error", err);
      }
    });
  });

  // RENDERING PROFILE MODAL TITLE
  $('#exampleModal2').on('show.bs.modal', function(event) {
  });
  $('#map-submit-btn').on('click', function(e) {
    //To get all the values from the controls
    let map_title = $('#map-title').val();
    let user_id = 2;
    let sendTitle = {
      map_title: map_title,
      user_id: user_id
    };
    //Ajax Call
    $.ajax({
      url: "/api/maps",
      data: sendTitle,
      type: "POST",
      success: function(result) {
        console.log("result", result);
        const pModalMap = createMapFormElement2(result);
        (console.log("pModalMap"));
        $("#calgary-attractions-link").append(pModalMap);
      },
      error: function(err) {
        console.log("there was an error", err);
      }
    });
  });
});

