console.log(localStorage.getItem("special_access"));
const specialAccess = localStorage.getItem('special_access');
if (specialAccess === '1') {
  const employeeerror = document.getElementById('employee');
  employeeerror.style.display = 'none';
  console.log("admin");
  
}
else {
    const adminstuff = document.getElementById('admin');
    adminstuff.style.display = 'none';
    console.log("employee");
}
  