const express = require('express');
const { ArduinoDataTemp } = require('./newserial')
const { ArduinoDataHumidity } = require('./serialHumidity')
const { ArduinoDataSwitch } = require('./serialSwitch')
const { ArduinoDataLuminosity} = require('./serialLuminosidity')
const router = express.Router();


router.get('/', (request, response, next) => {
    
    let sum = ArduinoDataTemp.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataTemp.List.length).toFixed(2);
	let sumHour = ArduinoDataTemp.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataTemp.ListHour.length).toFixed(2);

    response.json({
        data: ArduinoDataTemp.List,
        total: ArduinoDataTemp.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataTemp.ListHour,
		totalHour: ArduinoDataTemp.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });

});

router.get('/humidity', (request, response, next) => {

    /* console.log(ArduinoDataHumidity.List); */
    let sum = ArduinoDataHumidity.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataHumidity.List.length).toFixed(2);
	let sumHour = ArduinoDataHumidity.ListHour.reduce((a, b) => a + b, 0);
    let averageHour = (sumHour / ArduinoDataHumidity.ListHour.length).toFixed(2);
    
    /* Função reduce vai reduzir o array para um valor só, somando todas a posições dele e aqui no caso ele vai acumular no parametro a e vai passar o elemento que ele está somando para o parametro b e ultimo parametro vai para o valor inicial que aqui é zero. Aqui ele vai retornar a soma de todas as posições do array  retornando um inteiro para a variavel */
    let sumTemp = ArduinoDataHumidity.ListTemp.reduce((a, b) => a + b, 0);

    /* Variavel vai guardar a media das temperaturas pegando o valor total somado das temperaturas dividindo com o tamanho da lista de temperaturas e depois deixando com duas casas decimais */
    let averageTemp = (sumTemp / ArduinoDataHumidity.ListTemp.length).toFixed(2);
    
    response.json({
        data: ArduinoDataHumidity.List,
        dataTemp: ArduinoDataHumidity.ListTemp,
        totalTemp: ArduinoDataHumidity.List.length,
        total: ArduinoDataHumidity.List.length,
        average: isNaN(average) ? 0 : average,
        avarageTemp: isNaN(averageTemp) ? 0 : averageTemp, /* Verficicação de for NaN ele vai retornar zero se nao ele vai retoranr a variavel que fizemos a media */
		dataHour: ArduinoDataHumidity.ListHour,
		totalHour: ArduinoDataHumidity.ListHour.length,
        averageHour: isNaN(averageHour) ? 0 : averageHour,
        currentTemp: ArduinoDataHumidity.TempCurrent,
        currentHumity: ArduinoDataHumidity.HumityCurrent
    });

});

router.get('/switch', (request, response, next) => {

    let sum = ArduinoDataSwitch.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataSwitch.List.length).toFixed(2);
	let sumHour = ArduinoDataSwitch.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataSwitch.ListHour.length).toFixed(2);

    response.json({
        data: ArduinoDataSwitch.List,
        total: ArduinoDataSwitch.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataSwitch.ListHour,
		totalHour: ArduinoDataSwitch.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });

});

router.get('/luminosity', (request, response, next) => {

    let sum = ArduinoDataLuminosity.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataLuminosity.List.length).toFixed(2);
	let sumHour = ArduinoDataLuminosity.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataLuminosity.ListHour.length).toFixed(2);

    response.json({
        data: ArduinoDataLuminosity.List,
        total: ArduinoDataLuminosity.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataLuminosity.ListHour,
		totalHour: ArduinoDataLuminosity.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });

});

module.exports = router;
