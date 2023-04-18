fetch('test-in.json')
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

fetch('test-in.json')
    .then(response => response.json())
    .then(checkIns => {
        const tbody = document.querySelector('#checkouts');
        for (let checkIn of checkIns) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${checkIn.name}</td>
            <td>${checkIn.lastName}</td>
            <td>${checkIn.startDate}</td>
            <td>${checkIn.roomNo}</td>
            <td><button class="checkin-btn" onclick = "deleteRow(this)">↳</button></td>
            `;
            tr.querySelector('.checkin-btn').addEventListener('click', () => {
                
              alert(`Checked in ${checkIn.name} ${checkIn.lastName} to room ${checkIn.roomNo}`);
            });
            tbody.appendChild(tr);
        }
    });

function deleteRow(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}