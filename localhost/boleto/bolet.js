const user_id = localStorage.getItem("id")
const token = localStorage.getItem("token")
const newToken = token.replace(/["]/g, '') //Remover Aspas dupla de uma string


async function GerarCodigoBarras() {
    // event.preventDefault()
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    const conexao = await fetch("http://localhost:3000/codigo_barras", requestOptions)
    const response = await conexao.json();
    console.log(response)
    document.getElementById('boleto').value = response
    
    return response
}

async function pagarBoleto(body){
  event.preventDefault()
  const myHeadrs = new Headers();
  myHeadrs.append("Content-Type", "application/json"); 
  myHeadrs.append("authorization", "Bearer " + newToken)
  
  const requestOptions = {
      method: 'POST',
      headers: myHeadrs,
      body: JSON.stringify(body),
      redirect: 'follow'
  }
  
    const conexao = await fetch(`http://localhost:3000/boleto/${user_id}`, requestOptions)

    if(conexao.status == 400) {
      var errorMensagem = await conexao.json()
      console.log(errorMensagem.mensagem)
      alert(errorMensagem.mensagem)
      return
  } else {
      const conexaoConvertida = await conexao.json();
      window.localStorage.setItem("boleto", conexaoConvertida.boleto)
      window.localStorage.setItem("payment_date", conexaoConvertida.payment_date)
      window.localStorage.setItem("status", conexaoConvertida.status)
      return conexaoConvertida;
  }
}

async function pagBoleto(){
  event.preventDefault()
  const cod_barras = document.getElementById('boleto').value
  console.log("Novo codigo "+cod_barras)
  

  body = {
      "cod_barras": cod_barras
  }

  console.log(body)
  const comprovante = await pagarBoleto(body)
  alert("Boleto pago com sucesso!")
  window.location.href = 'http://localhost:8000/reserva'
}