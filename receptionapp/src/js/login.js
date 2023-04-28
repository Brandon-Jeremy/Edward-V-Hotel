const loginForm = document.querySelector('#loginform');
console.log(loginForm);
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const username = formData.get('username');
  const password = formData.get('password');

  fetch('http://127.0.0.1:8000/api/reception-login', {
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
      const errorDiv = document.querySelector('#error');
      errorDiv.innerHTML = "Username or password are wrong";
    } else {
      window.location.href = 'index.html';
    }
  })
  .catch(error => console.error(error));
});






