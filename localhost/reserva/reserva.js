
const token = localStorage.getItem("token")
const user_id = localStorage.getItem("id")
const nome = localStorage.getItem("name")
const email = localStorage.getItem("email")
const user_type_id = localStorage.getItem("user_type_id")
const newToken = token.replace(/["]/g, '') //Remover Aspas dupla de uma string
const id = localStorage.getItem("lab_id")

const NumBoleto = localStorage.getItem("boleto")
const payment_date = localStorage.getItem("payment_date")
const bStatus = localStorage.getItem("status")
const myDiv = document.getElementById('div')

async function conexaoApiLabPeloId() {
    if (user_type_id != 1){
        myDiv.style.display = "none"
    } else {
        myDiv.style.display = "block"
    }
    const conexao = await fetch(`http://localhost:3000/lab/${id}`, {
        method: 'GET',
        headers: {
            authorization: "Bearer " + newToken
        }
    })
    const response = await conexao.json();
    document.getElementById("name").value = nome
    document.getElementById("email").value = email
    document.getElementById("lab_name").value = response.lab_name
    document.getElementById("andar").value = response.floor
    document.getElementById("comprovante").textContent = `Boleto: ${NumBoleto}`
    document.getElementById("comprovante2").textContent = `Data: ${payment_date}`
    document.getElementById("comprovante3").textContent = `Status: ${bStatus}`
    return response
}

async function reservaPost(){
    event.preventDefault()
    let lab_name = document.getElementById("lab_name").value
    let lab_id = id
    body = {
        "lab_id": lab_id,
        "lab_name": lab_name
    }
    await fazPost(body)
    //alert(`Lab ${lab_name} reservado com sucesso`)
    window.location.href = 'http://localhost:8000/home/'
}



async function fazPost(body){

    const myHeadrs = new Headers();
        myHeadrs.append("Content-Type", "application/json"); 
        myHeadrs.append("authorization", "Bearer " + newToken)
    
    const requestOptions = {
        method: 'POST',
        headers: myHeadrs,
        body: JSON.stringify(body),
        redirect: 'follow'
    }
    const conexao = await fetch(`http://localhost:3000/reserva/${user_id}/reserva`, requestOptions)
    if(conexao.status == 400) {
        var errorMensagem = await conexao.json()
        console.log(errorMensagem.mensagem)
        return alert(errorMensagem.mensagem)
        
    } else {
        const response = await conexao.json();
        alert(`Lab reservado com sucesso`)
        return response
    }
    
}

