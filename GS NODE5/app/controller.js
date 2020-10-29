const express = require('express');
const { ArduinoData } = require('./newserial')
const router = express.Router();
const sensors = require('./sensors')

router.get('/', (request, response, next) => {

    let sum = ArduinoData.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoData.List.length).toFixed(2);
	let sumHour = ArduinoData.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoData.ListHour.length).toFixed(2);

    response.json({
        data: ArduinoData.List,
        total: ArduinoData.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoData.ListHour,
		totalHour: ArduinoData.ListHour.length,
        averageHour: isNaN(averageHour) ? 0 : averageHour,
       
       
        lastdata: sensors.lm35()
    // lastData: ArduinoData.List[ArduinoData.List.length-1]
    
    
    });

});

module.exports = router;