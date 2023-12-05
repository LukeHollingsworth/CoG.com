document.addEventListener("DOMContentLoaded", function() {
    const bigG = document.querySelector(".GText");
    const pages = ["truesect/truesect.html", "newsect/newsect.html", "lore.html", "calendar.html"];
  
    bigG.addEventListener("click", function() {
      const randomPage = pages[Math.floor(Math.random() * pages.length)];
      window.location.href = randomPage;
    });
  });
  
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: -25.363, lng: 131.044} // Set to your desired location
  });

  // Add markers and other map features here
}