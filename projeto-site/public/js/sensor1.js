
function getHoras(){
    var date  = new Date();
    var hora = date.getHours();
    var minuto = date.getMinutes();
    var segundos = date.getSeconds();

    if(hora < 10){
        hora = `0${hora}`;
    }

    if(minuto < 10){
        minuto = `0${minuto}`;
    }

    if(segundos < 10){
        segundos = `0${segundos}`;
    }

    var horas = `${hora}:${minuto}:${segundos}`;
    return horas;
}


function randomHumidity(){
    var maxHumidity = 80;
    var minHumidity = 20;
    var randomHumidity = Math.floor(Math.random()*(maxHumidity-minHumidity+1)+minHumidity);
    return randomHumidity;
}

var configHumidity = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Umidade',
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: [],
            fill: false,
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Histórico de Umidade',
        },
        legend: {
            labels: {
                fontSize: 15,
                fontColor: '#2980b9',
            }
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Horario de Leitura",
                },
                ticks: {
                    beginAtZero:true, 
                    fontColor: "#ecf0f1",
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "%"
                },
                ticks: {
                    beginAtZero:true, 
                    fontColor: "#ecf0f1",
                }
            }]
        },
        animation: {
            duration: 0
        }
    }
};

Chart.defaults.global.defaultFontFamily = "Montserrat";
var contentHumidity = document.getElementById("graficoChartHumity").getContext("2d");
contentHumidity.canvas.width = "100%";
contentHumidity.canvas.height = "100%";

var chartHumidity = new Chart(contentHumidity, configHumidity);

function getDataDefault(){

    var count = 5;

    for(var i=0;i<count;i++){
        configHumidity.data.labels.push(getHoras());
        configHumidity.data.datasets[0].data.push(randomHumidity());
        chartHumidity.update();
    }

}

function getHumidity(){ 

    var horas = getHoras();

    var newRegister = {
        hours: horas,
        dados: randomHumidity()
    };

    /* var newRegisterTemperature = {
        hours: horas,
        
    } */

    document.getElementById("currentUmitity").textContent = `${newRegister.dados}%`;

    configHumidity.data.labels.shift();
    configHumidity.data.labels.push(newRegister.hours);
    configHumidity.data.datasets[0].data.shift();
    configHumidity.data.datasets[0].data.push(newRegister.dados);

    chartHumidity.update();

    var updateHumidty = setTimeout(getHumidity, 3000);

}

getDataDefault();
getHumidity();
