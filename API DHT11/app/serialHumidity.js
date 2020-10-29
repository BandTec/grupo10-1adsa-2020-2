const sensors = require('./sensors')

class NewArduinoHumidity {

    constructor() {
        this.listData = [];
        this.__listDataTemp = [];
        this.listDataHour = [];
        this.currentHumity = [];

        this.listTempData = [];
        this.currentTemp = [];

    }

    get List() {
        return this.listData;
    }

    get ListHour() {
        return this.listDataHour;
    }

    get ListTemp() {
        return this.listTempData;
    }

    get CurrentTemperature() {
        return this.currentTemp;
    }

    get CurrentHumity() {
        return this.currentHumity;
    }
    
    SetConnection() {
        setInterval(() => {
            let data_float = sensors.dht11({ minHum: 40, maxHum: 80, minTemp: 10, maxTemp: 40 });

            let current_temp = data_float[1].toFixed(2);
            let current_humity = data_float[0].toFixed(2);

            if (this.__listDataTemp.length === 59) {
                let sum = this.__listDataTemp.reduce((a, b) => a + b, 0);
                this.listDataHour.push((sum / this.__listDataTemp.length).toFixed(2));
                while (this.__listDataTemp.length > 0) {
                    this.__listDataTemp.pop();
                }
            }

            this.__listDataTemp.push(data_float[0]);
            this.listData.push(data_float[0]);
            this.listTempData.push(data_float[1]);

            /* Aqui ele vai remover toda valor que estiver na posição zero e logo abaixo vai adicionar um novo valor no aray novamente atualizando */
            this.currentTemp.splice(0);
            this.currentTemp.push(current_temp);

            this.currentHumity.splice(0);
            this.currentHumity.push(current_humity);


            /* console.log(data_float[1].toFixed(2)); */
            /* console.log(data_float[1]); */



        }, 100);
    }
}

const serial = new NewArduinoHumidity();
serial.SetConnection();

module.exports.ArduinoDataHumidity = { List: serial.List, ListHour: serial.ListHour, ListTemp: serial.ListTemp, TempCurrent: serial.CurrentTemperature, HumityCurrent: serial.CurrentHumity }