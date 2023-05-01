const content = document.querySelector('#contact');
console.log(content);
content.addEventListener('submit' , event => {
    event.preventDefault();
    let receiver = content.querySelector('#receiver').value;
    let message = content.querySelector('#message').value;
    console.log(message);
    if (receiver === 'visitors') {
        fetch(`http://127.0.0.1:8000/api/email-current?$message=${message}` , {method: 'POST'});
    }
    else {
        fetch(`http://127.0.0.1:8000/api/email-all?$message=${message}` , {method: 'POST'});
    }
})