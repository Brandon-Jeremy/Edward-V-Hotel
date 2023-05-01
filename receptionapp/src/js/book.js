const fform = document.querySelector('#formroomtype');
const sform = document.getElementById("availablerooms");
const tform = document.getElementById("user")
let from;
let to;
fform.addEventListener('submit', (event) => {
  event.preventDefault();
  fform.style.display = "none"; 
	sform.style.display = "block";

  const roomType = fform.querySelector('#roomtype').value;
  const View = fform.querySelector('#view').checked ? 1 : 0;
  from = fform.querySelector('#from_visitor').value;
  to = fform.querySelector('#to_visitor').value;
  console.log(`http://localhost:8000/api/get-available?roomtype=${roomType}&view=${View}&date_from=${from}&date_to=${to}`);
  fetch(`http://localhost:8000/api/get-available?roomtype=${roomType}&view=${View}&date_from=${from}&date_to=${to}`, {
    method: 'POST',
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const tableBody = document.getElementById('availablerooms');
    let html = '<table><thead><tr><th>Room Number</th><th>Price</th><th></th></tr></thead><tbody>';
    let price =  data[data.length - 1].price;
    if (data.length === 1) {
      alert("NO ROOM FOUND");
      window.location.href = "book.html";
    }
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

let selectedroom;
sform.addEventListener("submit" , function(event) {
  event.preventDefault();
  const selectedoption = sform.querySelector('input[type="radio"]:checked');
  
  if (selectedoption) {
    selectedroom = selectedoption.value;
    sform.style.display = "none";
    tform.style.display = "block";
  } else {
    alert('No option selected');
  }
});

tform.addEventListener("submit" , function(event) {
  event.preventDefault();
  const firstName = tform.querySelector('#firstname_visitor').value;
  const lastName = tform.querySelector('#lastname_visitor').value;
  const dob = tform.querySelector('#dob_visitor').value;
  const gender = tform.querySelector('#gender_visitor').value;
  const nationality = tform.querySelector('#nationality_visitor').value;
  const cell = tform.querySelector('#cell_visitor').value;
  fetch(`http://localhost:8000/api/add-user?firstname=${firstName}&lastname=${lastName}&dob=${dob}&gender=${gender}&nationality=${nationality}&phonenum=${cell}` , {
    method: 'POST',
  })
  .then(response => response.json())
  .then(data => {
    const id = data.user_id;
    const roomnum = selectedroom[2];
    const roomfloor = selectedroom[0];
    const isnew = data.success;
    console.log(`http://localhost:8000/api/book-room?id=${id}&floor=${roomfloor}&number=${roomnum}&datefrom=${from}&dateto=${to}`);
    console.log(id , roomnum , roomfloor , isnew);
    console.log(`http://localhost:8000/api/book-room?id=${id}&floor=${roomfloor}&number=${roomnum}&datefrom=${from}&dateto=${to}`);
    fetch(`http://localhost:8000/api/book-room?id=${id}&floor=${roomfloor}&number=${roomnum}&datefrom=${from}&dateto=${to}` , {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      if (isnew) {
        alert("Room Booked and New Customer Registered");
      }
      else {
        alert("Room Booked for Old Customer")
      }
      window.location.href = "book.html";
    })
  });


})