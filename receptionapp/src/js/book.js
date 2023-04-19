
// linking with api
const roomsElement = document.getElementById('availablerooms');
console.log(roomsElement);
fetch('test-avrooms.json')
  .then(response => response.json())
  .then(data => {
    let html = '<table class = "tables"><thead><tr><th>Room Number</th><th>Price</th><th></th></tr></thead><tbody>';
    
    data.forEach(room => {
      html += `<tr><td>${room.number}</td><td>${room.price}</td><td><input type="checkbox" name="room" value="${room.number}"></td></tr>`;
    });
    
    html += '</tbody></table><input type = "submit" value = "OK">';
    roomsElement.innerHTML = html;
  })
  .catch(error => console.error(error));


// handles pop ups
let form = document.getElementById("formroomtype");
let resultDiv = document.getElementById("availablerooms");

form.addEventListener("submit", function(event) {
	event.preventDefault(); // prevent the form from submitting
	form.style.display = "none"; // hide the form
	resultDiv.style.display = "block"; // show the new content
});