const URL = "http://localhost:3333";
const form = document.getElementById("form-login");

form.addEventListener('submit', function (event) {
  event.preventDefault();
  authUser();
});

function authUser () {
  const jsonUser = createJsonUser();
  axios.post(`${URL}/auth`, jsonUser).then( response =>{
    const token = response.data.token;
    localStorage.setItem('token', token);
    window.location.href = "./index.html";
  }).catch( error => {
    console.log(error)
  })
}

function createJsonUser () {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const user = {
    email: emailInput.value,
    password: passwordInput.value,
  }
  return user;
}