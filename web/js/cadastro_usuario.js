const URL = "http://localhost:3333";
const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  createUser();
});

function createUser () {
  const jsonUser = createJsonUser();

  axios.post(`${URL}/user`, jsonUser).then( () => {
    alert('Usuário criado com sucesso!')
    window.location.href = "./login.html";
  }).catch( error => {
    alert('Erro ao cadastrar, tente novamente!')
    console.log(error);
  })
}

function createJsonUser () {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const password = document.getElementById('password');

  const user = {
    name: nameInput.value,
    email: emailInput.value,
    password: password.value
  }
  return user
}