function updateTime() { // this function will get the time and date to display them on the home page 
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString();
    
    document.getElementById("current-time").innerHTML = currentDate.toDateString();
    document.getElementById("current-date").innerHTML = currentTime;
  }
  
  setInterval(updateTime, 1000);

  updateTime();