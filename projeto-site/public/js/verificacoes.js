let idUsuario;
let emailUsuario;
let fkCliente;

function redirecionarLogin(){
    window.location.href = "login.html";
}

function finalizarSessao(){
    fetch(`/usuarios/sair/${emailUsuario}`, {cache:'no-store'});
}

function logOff(){
    finalizarSessao();
    sessionStorage.clear();
    redirecionarLogin();
}

function verificarSessao(){
    idUsuario = sessionStorage.idUsuario;
    emailUsuario = sessionStorage.emailUsuario;
    fkCliente = sessionStorage.fkCliente;

    if(emailUsuario == undefined){
        redirecionarLogin();
    }else{
        validarSessao();
    }
    console.log(emailUsuario);
}

function validarSessao(){
    fetch(`/usuarios/sessao/${emailUsuario}`, {cache: 'no-store'})
    .then(resposta =>{
        if(resposta.ok){
            resposta.text().then(texto => {
                console.log('Sessão :) ', texto);
            });
        }else{
            console.error('Sessão :.( ');
            logOff();
        }
    })
}

verificarSessao();