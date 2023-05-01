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
                    <td><button class="selector-btn" value = "${room.id}">Clean</button></td>
                </tr>`
                
    }
    html += `</tbody></table>`
    table.innerHTML = html;
        document.querySelectorAll('.selector-btn').forEach(btn => {
        btn.addEventListener('click' , event => {
            event.preventDefault();
            
            const selectedroom = event.target.value;
            console.log(selectedroom);
            fetch(`http://127.0.0.1:8000/api/set-clean?id=${selectedroom}` , {method:'POST'});
            window.location.href = "housekeeping.html";
        })
})
})