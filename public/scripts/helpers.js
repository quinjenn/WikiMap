// Favorite toggle button function
function toggleFocus(button) {
  if (button.classList.contains("focus")) {
    button.classList.remove("focus");
  } else {
    button.classList.add("focus");
  }
}


// Hide Div function
function togglePointsList() {
  const pointsList = document.querySelector('.points-list-container');
  pointsList.style.display = pointsList.style.display === 'none' ? 'block' : 'none';
}
