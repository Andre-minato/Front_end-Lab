const token = localStorage.getItem("token")
const newToken = token.replace(/["]/g, '') //Remover Aspas dupla de uma string
const is_disabled = null;
var btn = null;


async function conexaoApi() {
    const conexao = await fetch("http://localhost:3000/users", {
        method: 'GET',
        headers: {
            authorization: "Bearer " + newToken
        }
    })
    const response = await conexao.json();
    console.log(response)
    return response
}


const listaUser = document.querySelector("[data-lista]")

function constroiTabela(id, name, email, user_type_id, cpf_cnpj, phone, is_disabled, btn) {
    if (is_disabled != null){
        is_disabled = "inativo"
        btn = "Ativar"
    } else {
        is_disabled = "ativado" 
        btn = "Desativar"
    }
    const tabelaUsers = document.createElement("tr")
    tabelaUsers.className = "tabela-users"
    tabelaUsers.innerHTML = `
    <td id="id">${id}</td>
    <td id="nome">${name}</td>
    <td id="email">${email}</td>
    <td id="User_type">${user_type_id}</td>
    <td id="cpf">${cpf_cnpj}</td>
    <td id="telefone">${phone}</td>
    <td id="status">${is_disabled}</td>
    <td><button class="ativar" id="btn">${btn}</button></td>
    `
    return tabelaUsers;
}

async function users() {
    const listaApi = await conexaoApi();
    listaApi.forEach(elemento => listaUser.appendChild(
        constroiTabela(elemento.id, elemento.name, elemento.email, elemento.user_type_id, elemento.cpf_cnpj, elemento.phone, elemento.is_disabled)))
}
users();

async function conexaoApi_ativar(id) {
    //"http://localhost:3000/users/activate/4"
    const conexao = await fetch(`"http://localhost:3000/users/activate/${id}"`, {
        method: 'PUT',
        headers: {
            authorization: "Bearer " + newToken
        }
    })
    const response = await conexao.json();
    console.log(response)
    return response
}


