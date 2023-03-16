// Favorite toggle button function
function toggleFocus(button) {
  if (button.classList.contains("focus")) {
    button.classList.remove("focus");
  } else {
    button.classList.add("focus");
  }
}

//Hide Div Function
function toggleInfoList() {
  const infoList = document.querySelector('.full-info');
  infoList.style.display = infoList.style.display === 'none' ? 'block' : 'none';
}
window.addEventListener('load', () => {
  const infoList = document.querySelector('.full-info');
  infoList.style.display = 'none';
});


// dark mode toggle
function darkMode() {
  let bodyElement = document.body;
  let layoutContainerElement = document.querySelector('.layout-container');
  bodyElement.classList.toggle("dark-mode");
  layoutContainerElement.classList.toggle("dark-mode");
}


// Two button event function
$(document).ready(function() {
  // nothing changed here
  $('#anchor-sample-btn').on('click', function() {
    let text = $('#anchor-sample-btn').text();
    if (text === "On") {
      $(this).html('Off');
    } else {
      $(this).text('On');
    }
  });

  // listener on second button that triggers first
  $('#map-submit-btn').click(function(){
     $('#hide-points').click()
  })


});
