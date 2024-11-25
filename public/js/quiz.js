const comecarQuiz = document.querySelector(".comecar-quiz")
const proximaPergunta = document.querySelector(".proxima-pergunta")
const retanguloPergunta = document.querySelector(".questao-container")
const pergunta = document.querySelector(".questao")
const retanguloResposta = document.querySelector(".resposta-container")
const resposta = document.querySelectorAll(".resposta")

const ID_USUARIO = Number(sessionStorage.getItem("ID_USUARIO"))

let perguntaAtual = 0
let totalCorretas = 0

comecarQuiz.addEventListener("click", comecarJogo)
proximaPergunta.addEventListener("click", displayProximaPergunta)

function comecarJogo() {
  comecarQuiz.classList.add("hide")
  retanguloPergunta.classList.remove("hide")
  displayProximaPergunta()
}

function displayProximaPergunta() {
  resetState()

  if (perguntas.length === perguntaAtual) {
    return finalizarQuiz()
  }

  pergunta.textContent = perguntas[perguntaAtual].pergunta
  perguntas[perguntaAtual].respostas.forEach(resposta => {
    const novaResposta = document.createElement("button")
    novaResposta.classList.add("button", "resposta")
    novaResposta.textContent = resposta.text
    if (resposta.correto) {
      novaResposta.dataset.correto = resposta.correto
    }
    retanguloResposta.appendChild(novaResposta)

    novaResposta.addEventListener("click", selecionarResposta)
  })
}

function resetState() {
  while (retanguloResposta.firstChild) {
    retanguloResposta.removeChild(retanguloResposta.firstChild)
  }

  document.body.removeAttribute("class")
  proximaPergunta.classList.add("hide")
}

function selecionarResposta(event) {
  const respostaClicada = event.target

  if (respostaClicada.dataset.correto) {
    document.body.classList.add("correto")
    totalCorretas++
  } else {
    document.body.classList.add("incorreto")
  }

  document.querySelectorAll(".resposta").forEach(button => {
    button.disabled = true

    if (button.dataset.correto) {
      button.classList.add("correto")
    } else {
      button.classList.add("incorreto")
    }
  })

  proximaPergunta.classList.remove("hide")
  perguntaAtual++
}

function redirecionar(){
  window.location.href = "metricas.html";
}

function finalizarQuiz() {
  const totaldeQuestoes = perguntas.length

  var mensagemFinal = ""
  if (totalCorretas >= 6) {
    mensagemFinal = "Você é um fã do Warriors!"
  }
  else if (totalCorretas >= 5) {
    mensagemFinal = "Você sabe muito sobre o Warriors!"
  }
  else if (totalCorretas >= 3) {
    mensagemFinal = "Você torce para o Warriors"
  }
  else {
    mensagemFinal = "Você ainda é um torcedor iniciante"
  }

  retanguloPergunta.innerHTML =
    `
    <p class="mensagem-final">
      Você acertou ${totalCorretas} de ${totaldeQuestoes} questões!
      <span>Resultado: ${mensagemFinal}</span>
    </p>
    <button 
    onclick="redirecionar()"
    class="button"
  >
  Ver estatísticas 
    
  </button>
    <button 
      onclick=window.location.reload() 
      class="button-refazer"
    >
      Refazer Quiz
      
    </button>
    

  
  `
  fetch(`pontuacao/registrar/${ID_USUARIO}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      pontosServer: totalCorretas
    })
  }).then(res => {
    console.log(res);
  })
  console.log(totalCorretas);

  fetch(`pontuacao/registrarPontosMax/${ID_USUARIO}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      pontosServer: totalCorretas
    })
  }).then(res => {
    console.log(res);
  })
  console.log(totalCorretas);
}


const perguntas = [
  {
    pergunta: 'Em qual ano o Warriors conquistou seu primeiro título na NBA?',
    respostas: [
      { text: "2015", correto: false },
      { text: "1971", correto: false },
      { text: "1946", correto: true },
      { text: "2017", correto: false }
    ]
  },
  {
    pergunta: 'O Warriors segue tendo a melhor campanha da história da NBA em temporada regular, em qual ano aconteceu essa marca histórica?',
    respostas: [
      { text: "2016", correto: true },
      { text: "2017", correto: false },
      { text: "2015", correto: false },
      { text: "2018", correto: false }
    ]
  },
  {
    pergunta: 'Em que ano a franquia passou a se chamar Golden State Warriors?',
    respostas: [
      { text: '1971', correto: true },
      { text: '1946', correto: false },
      { text: '1962', correto: false },
      { text: "2000", correto: false }
    ]
  },
  {
    pergunta: 'Quantos títulos tem o Warriors?',
    respostas: [
      { text: "6", correto: false },
      { text: "7", correto: true },
      { text: "8", correto: false },
      { text: "5", correto: false }
    ]
  },
  {
    pergunta: 'Qual jogador que ingressou no time em 2016, e foi protagonista nos títulos de 2017 e 2018 nos Warriors?',
    respostas: [
      { text: 'Demarcus Cousins', correto: false },
      { text: 'Jordan Poole', correto: false },
      { text: 'Kevin Durant', correto: true },
      { text: 'Andre Iguodala', correto: false }
    ]
  },
  {
    pergunta: 'Em que ano o Warriors passou a ser uma dinastia?',
    respostas: [
      { text: '1971', correto: false },
      { text: '2015', correto: true },
      { text: '2010', correto: false },
      { text: '2017', correto: false }
    ]
  },
  {
    pergunta: 'Quantos MVP Stephen Curry tem na carreira?',
    respostas: [
      { text: '1', correto: false },
      { text: '3', correto: false },
      { text: '0', correto: false },
      { text: '2', correto: true },
    ]
  },
]