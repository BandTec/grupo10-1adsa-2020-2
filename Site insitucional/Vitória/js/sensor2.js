/* function getHoras(){
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
} */


function randomTemperature(){
    var maxTemperature = 17;
    var minTemperature = 29;
    var temperatureRandom = Math.random() * (maxTemperature - minTemperature) + minTemperature;
    return temperatureRandom;
}
 

var configTemperature = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperatura',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: [],
            fill: false,
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Histórico de Temperatura',
        },
        legend: {
            labels: {
                fontSize: 15,
                fontColor: '#e84393',
            }
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Horario de Leitura"
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
                    labelString: "C"
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
var contentTemperature = document.getElementById("graficoChartTemperature").getContext("2d");
contentTemperature.canvas.width = "100%";
contentTemperature.canvas.height = "100%"; 

var chartTemperature = new Chart(contentTemperature, configTemperature); 

function getDefaultDatas(){

    var count = 5;
    for(var i=0;i<count;i++){
        configTemperature.data.labels.push(getHoras());
        configTemperature.data.datasets[0].data.push(randomTemperature());
        chartTemperature.update();
    }

}

function getTemperature(){

    var horas = getHoras();

    var newRegister = {
        hours: horas,
        dados: randomHumidity()
    };

    document.getElementById("currentTemperature").textContent = `${newRegister.dados}ºC`;

    configTemperature.data.labels.shift();
    configTemperature.data.labels.push(newRegister.hours);
    configTemperature.data.datasets[0].data.shift();
    configTemperature.data.datasets[0].data.push(newRegister.dados);

    chartTemperature.update();

    var updateTemperature = setTimeout(getTemperature, 3000);

}

getDefaultDatas();
getTemperature();
