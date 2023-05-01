let selected_id;

document.addEventListener("DOMContentLoaded", function() {

fetch('http://127.0.0.1:8000/api/view-busy')
    .then(response => response.json())
    .then(visits => {
        const tbody = document.querySelector('#visits');
        for (let visit of visits[0]) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${visit.roomfloor}0${visit.roomnumber}</td>
            <td>${visit.datefrom}</td>
            <td>${visit.dateto}</td>
            <td><button class="selector-btn" value = "${visit.roomfloor}0${visit.roomnumber}">Select</button></td>
            `;
            tr.querySelector('.selector-btn').addEventListener('click', (event) => {
                selected_id = event.target.value;
                console.log(selected_id);
                document.getElementById("allvisits").style.display = "none";
                document.getElementById("visitmanager").style.display = "block";
                
                const extstay = document.querySelector('#extendstay');
                const addserv = document.querySelector('#addcharge');
                /*extstay.querySelector('#extbutton').addEventListener('submit' , (extevent) => {
                    extevent.preventDefault();
                    const newdate = extstay.querySelector('#newdate').value;
                    const paidext = extstay.querySelector('#paidext');

                })

                })*/
                addserv.querySelector('#addbutton').addEventListener('click' , (extevent) => {
                    extevent.preventDefault();
                    const service = document.querySelector('#service').value;
                    const price = document.querySelector('#price').value;
                    const paidd = document.querySelector('#paidd').checked ? 1 : 0;
                    console.log(`${service} , ${price} , ${paidd}`);
                    fetch(`http://127.0.0.1:8000/api/extra-charge?roomnum=${selected_id[2]}&floor=${selected_id[0]}&price=${price}&paid=${paidd}&item=${service}` , {method:'POST',});

                })
            });
            tbody.appendChild(tr);
        }
    });
    
document.addEventListener('DOMContentLoaded', () => {
    const myButton = document.getElementById('ay');
    myButton.addEventListener('click', () => {
        console.log(`'${selected_id}`);
    });
});
});