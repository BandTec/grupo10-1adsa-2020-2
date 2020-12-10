/* Função para aparecer a div de cadastro */
function divCadastro() {
    document.getElementById("cadastro1").style.display = 'flex';
    document.getElementById("login1").style.display = 'none';
}

/* Função para aparecer a div de login */
function divLogin() {
    document.getElementById("cadastro1").style.display = 'none';
    document.getElementById("login1").style.display = 'flex';
}

/* Limpar os inputs do formulario de cadastro */
function limparInputs(){
    document.querySelector('input[name="nomeRazaoSocial"]').value = "";
    document.querySelector('input[name="emailUsuario"]').value = "";
    document.querySelector('input[name="nomeUsuario"]').value = "";
    document.querySelector('input[name="cpfCpnjCliente"]').value = "";
    document.querySelector('input[name="telefoneCliente"]').value = "";
    document.querySelector('input[name="telefoneCelularCliente"]').value = "";
    document.querySelector('input[name="senhaUsuario"]').value = "";
    document.querySelector('input[id="senhaConfirma"]').value = "";
}

/* Função para cadastrar cliente e o respectivo usuario que o cliente cadastrou */
function cadastrar(){
    
    var formulario = document.getElementById("formCadastrar");
    var dataFormulario = new URLSearchParams(new FormData(formulario));
    
    fetch('/usuarios/cadastrar', {
        method: "POST",
        body: dataFormulario
    }).then((response) =>{
        if(response.ok){
            alert('Cadastrado com Sucesso');
            limparInputs();
            divLogin();
        }else{
            console.log('Erro de cadastro!');
            response.text().then((response) =>{
                alert(response.text);
            })
        }
    });

    return false;

}