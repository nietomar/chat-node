var socket = io.connect('https://chat-node-ium6.onrender.com');
var list = document.querySelector('#lista-users');
var username = window.location.pathname.replace('/chat/', '');
var clientes = [];

function conectarChat() {
  var id = socket.id;
  console.log('id:', socket.id, 'username:', username);
  $.post('/login', {username: username, id: id}, function (data) {
    console.log(data);
    clientes = data;
    list.innerHTML += 'Cargando...';
    var html = '';
    clientes.forEach(function (cliente) {
      html += `<li>
      <div class="d-flex bd-highlight">
        <div class="img_cont">
          <img src="https://i.ibb.co/940sMtR/trollface.png" class="rounded-circle user_img">
          <span class="online_icon"></span>
        </div>
        <div class="user_info">
          <span>${cliente.username}</span>
        </div>
      </div>
    </li>`;
    });
    list.innerHTML = html;
    $('.loader').hide();
  });
}

function enviarMensaje(e) {
  if (e.which != 13) return;
  var msg = document.querySelector('input').value;
  if (msg.length <= 0) return;
  $.post('/send', {
    text: msg,
    username: username,
    id: socket.id
  }, function (data) {
    document.querySelector('input').value = '';
  });
}

socket.on('mensaje', function (data) {
  data.username = data.username.replace('</', '');
  var sanitized = data.msg.replace('</', '');
  sanitized = sanitized.replace('>', '');
  sanitized = sanitized.replace('<', '');
  if (data.id == socket.id) {
    var msj = `<div class="d-flex justify-content-end mb-4">
    <div class="msg_cotainer_send">
    ${sanitized}
      <span class="msg_time_send">${data.username}</span>
    </div>
    <div class="img_cont_msg">
  <img src="https://i.ibb.co/940sMtR/trollface.png" class="rounded-circle user_img_msg">
    </div>
  </div>`;
    document.querySelector('#mensajes-container').innerHTML += msj;
  } else {
    var msj = `<div class="d-flex justify-content-start mb-4">
    <div class="img_cont_msg">
      <img src="https://i.ibb.co/940sMtR/trollface.png" class="rounded-circle user_img_msg">
    </div>
    <div class="msg_cotainer">
      ${sanitized}
      <span class="msg_time">${data.username}</span>
    </div>
  </div>`;
    document.querySelector('#mensajes-container').innerHTML += msj;
  }
})

socket.on('socket_desconectado', function (data) {
  console.log(data);
  clientes = clientes.filter(function (cliente) {
    console.log(cliente);
    return cliente.id != data.id;
  });
  list.innerHTML += 'Cargando...';
  var html = '';
  clientes.forEach(function (cliente) {
    html += `<li>
    <div class="d-flex bd-highlight">
      <div class="img_cont">
        <img src="https://i.ibb.co/940sMtR/trollface.png" class="rounded-circle user_img">
        <span class="online_icon"></span>
      </div>
      <div class="user_info">
        <span>${cliente.username}</span>
      </div>
    </div>
  </li>`;
  });
  list.innerHTML = html;
});

socket.on('socket_conectado', function (data) {
  console.log(data);
  clientes.push(data);
  list.innerHTML += 'Cargando...';
  var html = '';
  clientes.forEach(function (cliente) {
    html += `<li>
    <div class="d-flex bd-highlight">
      <div class="img_cont">
        <img src="https://i.ibb.co/940sMtR/trollface.png" class="rounded-circle user_img">
        <span class="online_icon"></span>
      </div>
      <div class="user_info">
        <span>${cliente.username}</span>
      </div>
    </div>
  </li>`;
  });
  list.innerHTML = html;
});
