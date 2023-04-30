const loginForm = document.querySelector('#loginform');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = loginForm.elements.username.value;
  const password = loginForm.elements.password.value;

  fetch('http://localhost:8000/api/reception-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.Error) {
      alert('Username or password are incorrect');
    } else {
      localStorage.setItem("special_access", data.Result.special_access);
      window.location.href = `index.html`;
    }
  })
  .catch(error => console.error(error));
  
  return false;
});






