async function fazCadastroLab(body){
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
        const conexao = await fetch("http://localhost:3000/lab", requestOptions)
        const conexaoConvertida = await conexao.json();
        return conexaoConvertida;
        } catch (e){
            return alert(mensagem)
        }
    
}

function cadastroLab(){
    event.preventDefault()
    let lab_name = document.getElementById("lab_name").value
    let floor = document.getElementById("floor").value
    let description = document.getElementById("description").value

    body = {
        "floor": floor,
        "lab_name": lab_name,
        "description": description,
        "is_active": 1,
        "occupied": 0
    }

    console.log(body)
    fazCadastroLab(body)
    alert("Cadastro de laboratório realizado com sucesso!")
    window.location.href = 'http://localhost:8000/home'
}

var inputs = $('input').on('keyup', verifyInputs)
        function verifyInputs(){
            const preenchidos = inputs.get().every(({value}) => value)
            $('#send').prop('disabled', !preenchidos)
        }
