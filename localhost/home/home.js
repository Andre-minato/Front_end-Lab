const token = localStorage.getItem("token")
const role = localStorage.getItem("role")
const user_type_id = localStorage.getItem("user_type_id")
const newToken = token.replace(/["]/g, '') //Remover Aspas dupla de uma string
const is_disabled = null;
const nome = document.querySelector("[data-name]")

async function conexaoApi() {
    const conexao = await fetch("http://localhost:3000/lab", {
        method: 'GET',
        headers: {
            authorization: "Bearer " + newToken
        }
    })
    const response = await conexao.json();
    console.log(response)
    return response
}

//disabled="disabled"
const selecaoRoutes = document.querySelector("[data-card]")
const textoInativo = document.getElementById('btn')

const cardLab = document.querySelector("[data-card]")

function constroiCard(id, floor, lab_name, description, is_disabled, occupied) {
    if (is_disabled != null){
        is_disabled = "inativo"
        btn = "Ativar"

    } else {
        is_disabled = "ativado" 
        btn = "Reservar"
    }
    if (occupied == 1){
        occupied = "Ocupado"
    } else {
        occupied = "Livre"
    }
    
    const card_Lab = document.createElement("div")
    card_Lab.className = "row"
    card_Lab.innerHTML = `
        <div class="col-sm-6 mb-3 mb-sm-0">
        <div class="card">
        <div class="card-body">
        <h4 class="card-title"><strong>Nome Laboratório: </strong>${lab_name}</h4></br>
        <p class="card-text"><strong>Andar: </strong>${floor}</p>
        <p class="card-text"><strong>Descrição: </strong>${description}</p>
        <p class="card-text"><strong>Número-id: </strong>${id}</p>
        <p class="card-text" id="ocupacao"><strong>Status: </strong>${occupied}</p>
        <img class="image" src="./download.png"></br>
        <button  class="ativar" id="btn" onclick="tipoUsuario(${id})">${btn}</button>
        </div>
        </div>
        </div>
    `
    return card_Lab;
}


function esconder(){

}

async function labs() {
    const listaApi = await conexaoApi();
    listaApi.forEach(elemento => 
        cardLab.appendChild(
        constroiCard(elemento.id, elemento.floor, elemento.lab_name, 
                    elemento.description, elemento.is_disabled, 
                    elemento.occupied, elemento.btn)))     
                   
}
labs();

function tipoUsuario(id){
    alert('reservar ' + id)
    window.localStorage.setItem("lab_id", id)
    if (user_type_id == 1) {
        window.location.href = 'http://localhost:8000/boleto/'
    } else {
        window.location.href = 'http://localhost:8000/reserva/'
    }
}

async function esconderBotao(){
    const labs = document.getElementById("labs")
    const users = document.getElementById("users")
    const textP = document.getElementById('ocupacao')
    const botaoCard = document.getElementById('btn')
    
    if (!role) {
        labs.style.display = "none"
        users.style.display = "none"
    } else {
        labs.style.display = "block"
        users.style.display = "block"
    }
    

}

