document.addEventListener("DOMContentLoaded", function() {
    const calendarDiv = document.getElementById("calendar");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    const specialDates = {
      "2023-12-21": "Winter Solstice",
      "2024-03-21": "Spring Equinox",
      "2024-06-21": "Summer Solstice",
      "2024-09-21": "Autumn Equinox",
    };
    
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    for (let i = 0; i < 12; i++) {
      const monthDiv = document.createElement("div");
      monthDiv.className = "month";
      const monthDate = new Date(currentYear, currentMonth + i, 1);
      const monthName = monthDate.toLocaleString("default", { month: "long" });
      monthDiv.innerHTML = `<h3>${monthName} ${currentYear + Math.floor((currentMonth + i) / 12)}</h3>`;
      
      // Add days of the week
      const dayOfWeekContainer = document.createElement("div");
      dayOfWeekContainer.className = "day-of-week-container";
      daysOfWeek.forEach(day => {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day-of-week";
        dayDiv.innerText = day;
        dayOfWeekContainer.appendChild(dayDiv);
      });
      
      monthDiv.appendChild(dayOfWeekContainer);
      
      const daysContainer = document.createElement("div");
      daysContainer.className = "daysRow";
      
      // Add empty cells for alignment
      const firstDay = monthDate.getDay();
      for (let k = 0; k < firstDay; k++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "day empty";
        daysContainer.appendChild(emptyDiv);
      }
      
      const daysInMonth = new Date(currentYear, currentMonth + i + 1, 0).getDate();
      
      for (let j = 1; j <= daysInMonth; j++) {
        const dayDate = new Date(currentYear, currentMonth + i, j);
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";

        // Check if the date is today
        if (dayDate.getDate() === currentDate.getDate() &&
        dayDate.getMonth() === currentDate.getMonth() &&
        dayDate.getFullYear() === currentDate.getFullYear()) {
        dayDiv.classList.add("today");
        }
        
        const dayString = dayDate.toLocaleDateString('en-CA');
        if (specialDates[dayString]) {
          dayDiv.classList.add("special");
          dayDiv.setAttribute("data-event", specialDates[dayString]);
        }
        
        dayDiv.innerText = j;
        daysContainer.appendChild(dayDiv);
      }
      
      monthDiv.appendChild(daysContainer);
      calendarDiv.appendChild(monthDiv);
    }
  });
  