const URL = "http://localhost:3333";
const formCreate = document.querySelector('#form-create');
const formEdit = document.querySelector('#form-edit');
const USER_TOKEN = localStorage.getItem('token');
const header = { headers:{ Authorization: USER_TOKEN } };


formCreate.addEventListener('submit', function (event) {
  event.preventDefault();
  createGame();
});

formEdit.addEventListener('submit', function (event) {
  event.preventDefault();
  editGame();
});

function listaTodosGames () {
  axios.get(`${URL}/games`, header).then(response => {
    const games = response.data;
    criaCorpoTabela(games);
  }).catch (error => {
    console.log(`Erro ao solicitar recurso ${error}`);
  });
}

function createGame () {
  const jsonGame = criaJsonGame();
  axios.post(`${URL}/game`, jsonGame, header ).then(response => {
    alert('Game cadastrado com sucesso!');
    limpaForm();
    window.location.reload(); 
  }).catch( error => {
    alert(`Erro ao cadastrar game! Tente novamente! ${error}`)
  });
}

function deleteGame (id) { 
  axios.delete(`${URL}/game/${id}`, header).then( () => {
    alert('Game deletado com sucesso!');
    limpaForm();
    window.location.reload();
  }).catch( error => {
    alert("Erro ao deletar o game, tente novamente!");
    console.log(error);
  })
}

function editGame () {
  const jsonGame = editaJsonGame();

  const inputId = document.querySelector('#id');
  const id = Number(inputId.value);

  axios.put(`${URL}/game/${id}`, jsonGame, header).then( () => {
    alert("Game editado com sucesso!")
    limpaForm();
    window.location.reload();
  }).catch( error => {
    alert("Erro ao editar o game, tente novamente!");
    console.log(error);
  })
}

function criaCorpoTabela (games) {
  const table = document.querySelector('.table');
  const tbody = document.createElement('tbody');

  for (game of games) {
    const tr = document.createElement('tr');
    tr.setAttribute("data-id", game.id)

    const tdName = document.createElement('td');
    tdName.setAttribute('data-name', game.name);
    const tdDescription = document.createElement('td');
    tdDescription.setAttribute('data-description', game.description)
    const tdYear = document.createElement('td');
    tdYear.setAttribute('data-year', game.year)
    const tdPrice = document.createElement('td');
    tdPrice.setAttribute('data-price', game.price);

    const tdButtonEdit = document.createElement('td');
    const tdButtonDelete = document.createElement('td');

    const buttonRedirectEdit = document.createElement('button');
    const buttonDelete = document.createElement('button');

    buttonRedirectEdit.innerHTML = "EDITAR";
    buttonDelete.innerHTML = "DELETAR";

    buttonRedirectEdit.classList.add('btn');
    buttonRedirectEdit.className += ' btn-warning btn-sm';
    buttonDelete.classList.add('btn');
    buttonDelete.className += ' btn-danger btn-sm';

    tdName.innerHTML = game.name;
    tdDescription.innerHTML = game.description;
    tdYear.innerHTML = game.year;

    const formatedPrice = game.price.toFixed(2).replace('.',',');
    tdPrice.innerHTML = `R$ ${formatedPrice}`;

    tdButtonEdit.appendChild(buttonRedirectEdit);
    tdButtonDelete.appendChild(buttonDelete);

    tr.appendChild(tdName);
    tr.appendChild(tdDescription);
    tr.appendChild(tdYear);
    tr.appendChild(tdPrice);
    tr.appendChild(tdButtonEdit);
    tr.appendChild(tdButtonDelete);
    tbody.appendChild(tr)

    buttonDelete.addEventListener('click', function () {
      deleteGame(tr.getAttribute('data-id'))
    });

    buttonRedirectEdit.addEventListener('click', function () {
      preecheFormEdit(tr.getAttribute("data-id"), tdName, tdDescription, tdYear, tdPrice)
    });
  }

  table.appendChild(tbody);
}

function preecheFormEdit (id, tdName, tdDescription, tdYear, tdPrice) {
  const nameInputEdit = document.querySelector('#nameEdit');
  nameInputEdit.value = tdName.getAttribute('data-name');

  const descriptionInputEdit = document.querySelector('#descriptionEdit');
  descriptionInputEdit.value = tdDescription.getAttribute('data-description');

  const yearInputEdit = document.querySelector('#yearEdit');
  yearInputEdit.value = tdYear.getAttribute('data-year');

  const priceInputEdit = document.querySelector('#priceEdit');
  priceInputEdit.value = tdPrice.getAttribute('data-price');

  const inputId = document.querySelector("#id");
  inputId.value = id
}

function criaJsonGame () {
  const nameInput = document.querySelector("#name");
  const descriptionInput = document.querySelector("#description");
  const yearInput = document.querySelector('#year');
  const priceInput = document.querySelector("#price");
  const formatedPrice = Number(priceInput.value.replace(',','.'));

  const game = {
    name: nameInput.value,
    description: descriptionInput.value, 
    year: yearInput.value,
    price: formatedPrice
  }
  return game;
}

function editaJsonGame () {
  const nameInputEdit = document.querySelector("#nameEdit");
  const descriptionInputEdit = document.querySelector("#descriptionEdit");
  const yearInputEdit = document.querySelector('#yearEdit');
  const priceInputEdit = document.querySelector("#priceEdit");
  const formatedPriceEdit = Number(priceInputEdit.value.replace(',','.'));

  const game = {
    name: nameInputEdit.value,
    description: descriptionInputEdit.value, 
    year: yearInputEdit.value,
    price: formatedPriceEdit
  }
  return game;
}

function limpaForm () {
  const nameInput = document.querySelector("#name");
  const descriptionInput = document.querySelector("#description");
  const yearInput = document.querySelector('#year');
  const priceInput = document.querySelector("#price");

  nameInput.value = '';
  descriptionInput.value = '';
  yearInput.value = '';
  priceInput.value = '';
} 

listaTodosGames();
