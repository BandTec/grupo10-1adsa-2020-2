var id_usuario = sessionStorage.idUsuario;

function carregarEstufas(){

    fetch(`/estufas/estufas-usuario/${id_usuario}`).then(resposta =>{
        if(resposta.ok){
            resposta.json().then(json =>{
                /* alert("Foram encontrados "+json); */

                if(json.length > 0){

                    document.querySelector(".nao-encontrado").style.display = "none";
                    document.querySelector(".estufas").style.display = "flex";
                    document.getElementById("title-contem").style.display = "block";
                    document.getElementById("desc-contem").style.display = "block";
                    document.getElementById("title-naoContem").style.display = "none";
                    document.getElementById("desc-naoContem").style.display = "none";

                    json.forEach(estufa => {

                        var divEstufas = document.querySelector(".estufas");

                        var itemEstufa = document.createElement("div");
                        itemEstufa.classList.add("item-estufas");

                        var imgEstufa = document.createElement("img");
                        imgEstufa.src = "imagens/greenhouse2.svg";

                        var tituloCultura = document.createElement("p");
                        tituloCultura.innerHTML = "Tipo Cultura:"
                        
                        var tipoCultura = document.createElement("p");
                        tipoCultura.innerHTML = estufa.tipoCultura;

                        itemEstufa.append(imgEstufa);
                        itemEstufa.append(tituloCultura);
                        itemEstufa.append(tipoCultura);
                        divEstufas.append(itemEstufa);

                        imgEstufa.addEventListener("click", () =>{
                            unicaEstufa(estufa.idEstufa);
                        }); 
                    });

                }else{

                    document.querySelector(".nao-encontrado").style.display = "flex";
                    document.querySelector(".estufas").style.display = "none";
                    document.getElementById("title-naoContem").style.display = "block";
                    document.getElementById("desc-naoContem").style.display = "block";
                    document.getElementById("title-contem").style.display = "none";
                    document.getElementById("desc-contem").style.display = "none";
                    
                }

                /* console.log(json); */
            })
        }else{
            console.log("Erro recuperar!");
            
            resposta.text().then(texto =>{
                console.error(texto);
            })
        }
    });
}

function verificar(){
    editar_estufa.style.display = "block";
    excluir_estufa.style.display = "block";
}

function unicaEstufa(idEstufa){
    fetch(`/estufas/estufa-detalhe/${idEstufa}`)
    .then(resposta =>{
        if(resposta.ok){
            resposta.json().then(dados =>{
                abrirModalEditar();
                estufaTipoCultura.value = dados.tipoCultura;
                tempMaxima.value = dados.temperaturaMaxima;
                tempMin.value = dados.temperaturaMinima;
                umiMin.value = dados.umidadeMaxima;
                umiMax.value = dados.umidadeMinima;
            })
        }
    });
}

window.onload = carregarEstufas;