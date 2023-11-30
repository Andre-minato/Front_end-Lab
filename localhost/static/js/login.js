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
    //try {
    
    const conexao = await fetch("http://localhost:3000/users/login", requestOptions)
    if(conexao.status == 400) {
        var errorMensagem = await conexao.json()
        console.log(errorMensagem.mensagem)
        alert(errorMensagem.mensagem)
        return
    } else {
        const conexaoConvertida = await conexao.json();
        alert(conexaoConvertida.mensagem)
        window.localStorage.setItem("token", JSON.stringify(conexaoConvertida.data.token))
        window.localStorage.setItem("id", conexaoConvertida.id)
        window.localStorage.setItem("role", conexaoConvertida.role)
        window.localStorage.setItem("name", conexaoConvertida.name)
        window.localStorage.setItem("email", conexaoConvertida.email)
        window.localStorage.setItem("user_type_id", conexaoConvertida.user_type_id)

        window.location.href = 'http://localhost:8000/home/'
        console.log(localStorage.getItem())
        return conexaoConvertida;
    }
        
    
    
}

function login(){
    event.preventDefault()
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value

    console.log(email)
    console.log(senha)
    body = {
        "email": email,
        "password": senha
    }
    fazPost(body)
}

function mostrarSenha(){
    var inputPass = document.getElementById('senha')
    var btnShowPass = document.getElementById('btn-senha')

    if(inputPass.type === 'password'){
        inputPass.setAttribute('type', 'text')
        btnShowPass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
    } else {
        inputPass.setAttribute('type', 'password')
        btnShowPass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill')
    }
}

var inputs = $('input').on('keyup', verifyInputs)
        function verifyInputs(){
            const preenchidos = inputs.get().every(({value}) => value)
            $('#send').prop('disabled', !preenchidos)
        }

