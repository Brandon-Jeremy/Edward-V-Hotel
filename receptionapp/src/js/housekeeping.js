fetch(`http://127.0.0.1:8000/api/needs-service`)
.then(response => response.json())
.then(dirtyrooms => {
    let table = document.querySelector('#dirtyrooms');
    console.log(table);
    let html = `<table><thead><tr><th>Room Number</th><th></th></tr></thead><tbody>`;
    
    
    for (let room of dirtyrooms[0]) {
        console.log(room);
        html += `<tr>
                    <td>${room["floor"]}0${room.room_number}</td>
                    <td><button class="selector-btn" value = "${room.roomfloor}0${room.roomnumber}">Select</button></td>
                </tr>`
    }
    html += `</tbody></table>`
    table.innerHTML = html;
})