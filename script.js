document.addEventListener("DOMContentLoaded", function() {
    const bigG = document.querySelector(".GText");
    const pages = ["trueSect/trueSect.html", "newSect/newSect.html", "lore.html", "calendar.html"];
  
    bigG.addEventListener("click", function() {
      const randomPage = pages[Math.floor(Math.random() * pages.length)];
      window.location.href = randomPage;
    });
  });
  