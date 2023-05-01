console.log(localStorage.getItem("special_access"));
const specialAccess = localStorage.getItem('special_access');
if (specialAccess === '1') {
  const employeeerror = document.getElementById('employee');
  employeeerror.style.display = 'none';
  console.log("admin");
  const statform = document.querySelector("#period");
  const resultstat = document.querySelector("#result");
  const pdf = document.querySelector("#pdf");
  statform.querySelector("#statbtn").addEventListener('click' , event => {
    event.preventDefault();
    const statfrom = statform.querySelector("#statfrom").value;
    const statto = statform.querySelector("#statto").value;
    let si;
    let dv;
    let dn;
    let su;
    let revenue;
    let occ;
    console.log(statto);
    fetch(`http://127.0.0.1:8000/api/financial-data?datefrom=${statfrom}&dateto=${statto}` , {method : 'POST'})
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let ge = data["General Information"];
      console.log(ge);
      si = ge["Single Count"];
      console.log(ge["Single Count"]);
      dn = ge["Double Count w/o View"];
      dv = ge["Double Count w/ View"];
      su = ge["Suite count"];
      revenue = data["Revenue"];
      console.log(si , dn , dv , su , revenue);
      fetch(`http://127.0.0.1:8000/api/occupancy-data?datefrom=${statfrom}&dateto=${statto}` , {method : 'POST'})
      .then(response => response.json())
      .then(data => {
        occ = data["Number of rooms rented"];
        console.log(occ);
        statform.style.display = 'none';
        resultstat.style.display = "block";
        resultstat.innerHTML = `<table style = "color:white; text-align:left"><tbody><tr><td><b>Single</b></td><td>${si}</td></tr><tr><td><b>Double No View    </b></td><td>${dn}</td></tr><tr><td><b>Double With View</b></td><td>${dv}</td></tr><tr><td><b>Suite</b></td><td>${su}</td></tr><tr><td><b>Revenue</b></td><td>${revenue}</td></tr><tr><td><b>Occupancy</b></td><td>${occ}</td></tr></tbody></table><br><button type = "submit" id = "pdfbtn">Export Data</button>`
        resultstat.querySelector("#pdfbtn").addEventListener('click' , event => {
          event.preventDefault();
          pdf.style.display = "block";
          resultstat.style.display = "none";
          fetch(`http://127.0.0.1:8000/api/generate-pdf?datefrom=${statfrom}&dateto=${statto}` , {method:'POST'})
          .then(response => response.arrayBuffer())
          .then(data => {
            const blob = new Blob([data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const iframe = document.createElement('iframe');
            iframe.src = url;
            pdf.appendChild(iframe);
          });
        })
      })
    })
    
  })
}
else {
    const adminstuff = document.getElementById('admin');
    adminstuff.style.display = 'none';
    console.log("employee");
}
  