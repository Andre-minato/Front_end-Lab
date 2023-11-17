async function fazPost(body){
    console.log(body)

    const myHeadrs = new Headers();
        myHeadrs.append("Content-Type", "application/json"); 
    
    const requestOptions = {
        method: 'POST',
        headers: myHeadrs,
        body: JSON.stringify(body),
        redirect: 'follow'
    }
    try {
        const conexao = await fetch("http://localhost:3000/users", requestOptions)
        const conexaoConvertida = await conexao.json();
        console.log(conexaoConvertida)
        console.log(conexaoConvertida.data.token)
        alert(conexaoConvertida.mensagem)
        console.log(conexaoConvertida.mensagem)
        return conexaoConvertida;
        } catch (e){
            console.log(mensagem)
            return alert(mensagem)
        }
    
}

function cadastro(){
    event.preventDefault()
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let user_type = document.getElementById("user_type").value
    let cpf_cnpj = document.getElementById("cpf_cnpj").value
    let phone = document.getElementById("phone").value
    let password = document.getElementById("password").value

    body = {
        "role": "",
        "name": name,
        "email": email,
        "user_type_id": user_type,
        "cpf_cnpj": cpf_cnpj,
        "phone": phone,
        "password": password,
        "is_active": ""
        
    }

//     "role": "",
//   "name": "Teste Minato",
//   "email": "teste@teste.com.br",
//   "user_type_id": "aluno",
//   "password": "123",
//   "is_active": 1,
//   "cpf_cnpj": "12345678936",
//   "phone": "119999999999"

    console.log(body)
    fazPost(body)
    window.location.href = 'http://localhost:8000/'
}

var inputs = $('input').on('keyup', verifyInputs)
        function verifyInputs(){
            const preenchidos = inputs.get().every(({value}) => value)
            $('#send').prop('disabled', !preenchidos)
        }