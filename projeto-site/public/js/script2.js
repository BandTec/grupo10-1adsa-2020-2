let btnAbrirModalEditar = document.getElementById("editar_sensor");
let btnFecharModalEditar = document.querySelector(".modal-editar");


const abrirModalEditar = () =>{
    document.querySelector("body").style.background = "rgba(0, 0, 0, 0.50)";
    document.querySelector(".modal-editar").style.top = "0";
}

const fecharModalEditar = () =>{
    document.querySelector("body").style.background = "none";
    document.querySelector(".modal-editar").style.top = "-100%";
}

btnFecharModalEditar.addEventListener('click', fecharModalEditar);

function verificar(){
    editar_estufa.style.display = "block";
    excluir_sensor.style.display = "block";
}

function dash(){
    window.href="dashboard.html";
}