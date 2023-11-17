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
        console.log(conexaoConvertida)
        console.log(conexaoConvertida.data.token)
        //alert(conexaoConvertida.mensagem)
        console.log(conexaoConvertida.mensagem)
        window.localStorage.setItem("token", JSON.stringify(conexaoConvertida.data.token))
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

