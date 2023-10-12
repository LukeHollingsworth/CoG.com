document.addEventListener("DOMContentLoaded", function() {
    const bigG = document.querySelector(".GText");
    const pages = ["truesect/truesect.html", "newsect/newsect.html", "lore.html", "calendar.html"];
  
    bigG.addEventListener("click", function() {
      const randomPage = pages[Math.floor(Math.random() * pages.length)];
      window.location.href = randomPage;
    });
  });
  