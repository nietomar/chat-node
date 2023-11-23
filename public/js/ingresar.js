function joinChat() {
  var regex = /^[a-zA-Z0-9]+$/;

  var username = document.querySelector('#username').value;
  if (username.length <= 0) {
    alert('El nombre de usuario es requerido.');
  } else if(regex.test(username)){
    window.location = '/chat/' + username;
  }
  else{
    alert('Ingresa un formato válido (letras y números), no seas chistoso')
  }
}