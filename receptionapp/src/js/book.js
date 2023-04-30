const fform = document.querySelector('#formroomtype');
const sform = document.getElementById("availablerooms");
const tform = document.getElementById("user")

fform.addEventListener('submit', (event) => {
  event.preventDefault();
  fform.style.display = "none"; 
	sform.style.display = "block";

  const roomType = fform.querySelector('#roomtype').value;
  const View = fform.querySelector('#view').checked ? 1 : 0;
  console.log(JSON.stringify({ roomtype: roomType, view: View }));
  fetch(`http://localhost:8000/api/get-available?roomtype=${roomType}&view=${View}`, {
    method: 'POST',
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const tableBody = document.getElementById('availablerooms');
    let html = '<table><thead><tr><th>Room Number</th><th>Price</th><th></th></tr></thead><tbody>';
    let price =  data[data.length - 1].price;
    let room;
    for (let i = 0 ; i < data.length - 1 ; i++) {
      room = data[i];
      console.log(room);
      const roomNo = `${room.floor}0${room.room_number}`;
      html += `<tr><td>${roomNo}</td><td>${price}</td><td><input type="radio" name="room" value="${roomNo}"></td></tr>`;      
    }
    html += '</tbody></table><br><button type = "submit">OK</button>';
    tableBody.innerHTML = html;
  })
  .catch(error => {
    console.error(error);
  });
});

