let selected_id = 0;


fetch('test-visit.json')
    .then(response => response.json())
    .then(visits => {
        const tbody = document.querySelector('#visits');
        for (let visit of visits) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${visit.name}</td>
            <td>${visit.lastname}</td>
            <td>${visit.startdate}</td>
            <td>${visit.room_no}</td>
            <td><button class="selector-btn">Select</button></td>
            `;
            tr.querySelector('.selector-btn').addEventListener('click', () => {
                selected_id = visit.room_no;
                document.getElementById("allvisits").style.display = "none";
                document.getElementById("visitmanager").style.display = "block";
            });
            tbody.appendChild(tr);
        }
    });
    
document.addEventListener('DOMContentLoaded', () => {
        // Get the button element from the DOM
    const myButton = document.getElementById('ay');

        // Add a click event listener to the button
    myButton.addEventListener('click', () => {
        // This code will execute when the button is clicked
        console.log(`'${selected_id}`);
    });
});