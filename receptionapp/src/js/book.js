
// linking with api
const roomsElement = document.getElementById('availablerooms');
console.log(roomsElement);
fetch('test-avrooms.json')
  .then(response => response.json())
  .then(data => {
    let html = '<table><thead><tr><th>Room Number</th><th>Price</th><th></th></tr></thead><tbody>';
    
    data.forEach(room => {
      html += `<tr><td>${room.number}</td><td>${room.price}</td><td><input type="checkbox" name="room" value="${room.number}"></td></tr>`;
    });
    
    html += '</tbody></table><br><button type = "submit">OK</button>';
    roomsElement.innerHTML = html;
  })
  .catch(error => console.error(error));


// handles pop ups
let fform = document.getElementById("formroomtype");
let sform = document.getElementById("availablerooms");
let tform = document.getElementById("user")
fform.addEventListener("submit", function(event) {
	event.preventDefault(); 
	fform.style.display = "none"; 
	sform.style.display = "block";
});

sform.addEventListener("submit" , function(event) {
  event.preventDefault();
  sform.style.display = "none";
  tform.style.display = "block";
});