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
    const botao = document.getElementById("btn")
    if (is_disabled != null){
        is_disabled = "inativo"
        btn = "Ativar"
        

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

async function conexaoApi_ativar(id) {
    const lab_id = id
    const myHeadrs = new Headers();
    myHeadrs.append("Content-Type", "application/json"); 
    myHeadrs.append("authorization", "Bearer " + newToken)
    
    const requestOptions = {
        method: 'PUT',
        headers: myHeadrs,
        redirect: 'follow'
    }
    try {
        const conexao = await fetch(`http://localhost:3000/lab/activate/${lab_id}`, requestOptions)
        const conexaoConvertida = await conexao.json();
        return alert(conexaoConvertida.mensagem)
    } catch {
        return alert("Indisponível, tente mais tarde!")
    }
}



async function desativarLab(id){
    const lab_id = id
    const myHeadrs = new Headers();
        myHeadrs.append("Content-Type", "application/json"); 
        myHeadrs.append("authorization", "Bearer " + newToken)
    
    const requestOptions = {
        method: 'DELETE',
        headers: myHeadrs,
        redirect: 'follow'
    }
    try {
        const conexao = await fetch(`http://localhost:3000/lab/disable/${lab_id}`, requestOptions)
        const conexaoConvertida = await conexao.json();
        return alert(conexaoConvertida.mensagem)
    } catch {
        return alert("Indisponível, tente mais tarde!")
    }
}