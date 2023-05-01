fetch('http://127.0.0.1:8000/api/get-reserved')
    .then(response => response.json())
    .then(checkIns => {
        const tbody = document.querySelector('#checkins');
        for (let checkIn of checkIns) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${checkIn.name}</td>
            <td>${checkIn.lastName}</td>
            <td>${checkIn.startDate}</td>
            <td>${checkIn.roomNo}</td>
            <td><button class="checkin-btn" onclick = "deleteRow(this)">✔</button></td>
            `;
            tr.querySelector('.checkin-btn').addEventListener('click', () => {
                
                
            });
            tbody.appendChild(tr);
        }
    });

fetch('http://127.0.0.1:8000/api/show-checkout')
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector('#checkouts');
        let checkouts = data.Checkouts;
        for (let checkout of checkouts) {
            fetch(`http://127.0.0.1:8000/api/get-user?id=${checkout.userid}`)
            .then(response => response.json())
            .then(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${checkout.date}</td>
            <td><a href = "/charges.html?${}"${checkout.floor}0${checkout.room_number}</td>
            <td><button class="checkin-btn" onclick = "deleteRow(this)" value = "${checkout.id}|||${checkout.room_id}">↳</button></td>
            `;
            tbody.appendChild(tr);
            })
        }
        tbody.addEventListener('click', (event) => {
            if (event.target.classList.contains('checkin-btn')) {
              const selectedRoom = event.target.value;
              fetch()
            }
          });
    });

function deleteRow(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}