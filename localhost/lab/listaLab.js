const token = localStorage.getItem("token")
const newToken = token.replace(/["]/g, '') //Remover Aspas dupla de uma string
const is_disabled = null;
var btn = null;


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

const textoInativo = document.getElementById('btn')
const listaLab = document.querySelector("[data-lista]")

function constroiTabela(id, floor, lab_name, description, is_disabled, btn) {
    if (is_disabled != null){
        is_disabled = "inativo"

    } else {
        is_disabled = "ativado" 
        btn = "Desativar"
    }

    const tabelaLab = document.createElement("tr")
    tabelaLab.className = "tabela-users"
    tabelaLab.innerHTML = `
    <td id="id">${id}</td>
    <td id="nome">${floor}</td>
    <td id="email">${lab_name}</td>
    <td id="User_type">${description}</td>
    <td id="status">${is_disabled}</td>
    <td><button class="ativar" id="btn">${btn}</button></td>
    `
    return tabelaLab;
}

//const botaoInteracao = document.querySelector('ativar')

// botaoInteracao.addEventListener("click", evento => conexaoApi_ativar(evento))

async function users() {
    const listaApi = await conexaoApi();
    listaApi.forEach(elemento => listaLab.appendChild(
        constroiTabela(elemento.id, elemento.floor, elemento.lab_name, elemento.description, elemento.is_disabled)))
}
users();

async function conexaoApi_ativar(evento, id) {
    evento.preventDefault()
    //"http://localhost:3000/users/activate/4"
    const conexao = await fetch(`"http://localhost:3000/lab/activate/${id}"`, {
        method: 'PUT',
        headers: {
            authorization: "Bearer " + newToken
        }
    })
    const response = await conexao.json();
    console.log(response)
    return response
}

$(document).ready(function() {
    $('#btn').click(function() {
        
    })
})