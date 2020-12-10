let btnAbrirModalEditar = document.getElementById("editar_estufa");
let btnFecharModalEditar = document.querySelector(".modal-editar");
let btnAbrirModalExcluir = document.getElementById("excluir_estufa");
let btnFecharModalExcluir = document.querySelector(".modal-excluir");
let btnCancelarExcluir = document.getElementById("cancelaExcluir");

const abrirModalEditar = () => {
    document.querySelector("body").style.background = "rgba(0, 0, 0, 0.50)";
    document.querySelector(".modal-editar").style.top = "0";
}

const fecharModalEditar = () => {
    document.querySelector("body").style.background = "none";
    document.querySelector(".modal-editar").style.top = "-100%";
}

const abrirModalExcluir = () => {
    document.querySelector("body").style.background = "rgba(0, 0, 0, 0.50)";
    document.querySelector(".modal-excluir").style.bottom = "0";
}

const fecharModalExcluir = () => {
    document.querySelector("body").style.background = "none";
    document.querySelector(".modal-excluir").style.bottom = "-100%";
}

btnAbrirModalEditar.addEventListener('click', abrirModalEditar);
btnFecharModalEditar.addEventListener('click', fecharModalEditar);
btnAbrirModalExcluir.addEventListener('click', abrirModalExcluir);
btnFecharModalExcluir.addEventListener('click', fecharModalExcluir);
btnCancelarExcluir.addEventListener('click', fecharModalExcluir);


function verificar() {
    editar_estufa.style.display = "block";
    excluir_estufa.style.display = "block";
}

function dash() {
    window.href = "dashboard.html";
}

function quem_somos() {
    window.location.href = "index.html#container_info";
}