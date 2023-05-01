function updateTime() { // this function will get the time and date to display them on the home page 
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString();
    
    document.getElementById("current-time").innerHTML = currentDate.toDateString();
    document.getElementById("current-date").innerHTML = currentTime;
  }
  console.log(localStorage.getItem("special_access")); 
setInterval(updateTime, 1000);

updateTime();

