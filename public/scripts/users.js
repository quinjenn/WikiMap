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

$(document).ready(function () {
const myMapsInfo = function () {
  $.ajax({
    method: "GET",
    url: "/my-maps",
    success: (maps) => {
      for (const property of maps) {
        const $propertyElement = createPropertyElement(property);
        $map-points-container.prepend($propertyElement);
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


