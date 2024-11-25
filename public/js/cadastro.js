function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
  
    var b_usuario = document.getElementById("b_usuario");
  
    if (email != null && nome != null) {
      b_usuario.innerHTML = nome;
    } else {
      window.location = "../login.html";
    }
  }
  
  function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
  }
  
  // carregamento (loading)
  // function aguardar() {
  //   var divAguardar = document.getElementById("div_aguardar");
  //   divAguardar.style.display = "flex";
  // }
  
  function cadastrar() {
    var nomeVar = ipt_nome.value;
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
  
    if (
      nomeVar == "" ||
      emailVar == "" ||
      senhaVar == ""
    ) {  
      finalizarAguardar();
      return false;
    } else if (nomeVar.length <= 1) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "Mensagem de erro para o campo Nome";
  
      finalizarAguardar();
      return false;
    } else if (emailVar.indexOf('@') == -1 || emailVar.indexOf('.') == -1) {
      finalizarAguardar();
      return false;
  
    } else if (senhaVar.length <= 6) {
  
      finalizarAguardar();
      return false;
    } else {
      fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeServer: nomeVar,
          emailServer: emailVar,
          senhaServer: senhaVar
        }),
      })
        .then(function (resposta) {
          console.log("resposta: ", resposta);
  
  
          if (resposta.ok) {
  
            setTimeout(() => {
              window.location = "login.html";
            }, "2000");
  
            limparFormulario();
            finalizarAguardar();
          } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
          finalizarAguardar();
        });
    }
  
  }