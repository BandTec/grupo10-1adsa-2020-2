function logar(){
    
    var dataFormulario = document.getElementById("formLogin");
    var formulario = new URLSearchParams(new FormData(dataFormulario));

    if(document.querySelector('input[name="email_Login"]').value == "" || document.querySelector('input[name="senha_Login"]').value == ""){
        alert("Preencha todos os campos!");

    }else{

        fetch("/usuarios/autenticar", {
            method: "POST",
            body: formulario
        }).then(resposta =>{

            if(resposta.ok){
                
                resposta.json().then(json =>{
                    sessionStorage.idUsuario = json.idUsuario;
                    sessionStorage.emailUsuario = json.emailusuario;
                    sessionStorage.fkCliente = json.fkcliente;
                    window.location = "home.html";
                    /* console.log(json); */
                });
            }else{
                console.log('Erro de Login');
                
                resposta.text().then(texto =>{
                    console.error(texto);
                    alert(texto);
                })
            }

        });

    }

    return false;

}