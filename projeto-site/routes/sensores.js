var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Cliente = require('../models').Cliente;
var Usuario = require('../models').Usuario;
var LocalEstufa = require('../models').LocalEstufa;
var Estufa = require('../models').Estufa;
var Sensor = require('../models').Sensor;


router.get('/sensores-detalhe/:idSensor', (req, res, next) =>{
    console.log("Recuperando dados de uma Estufa...");

    var idSensor = req.params.idSensor;

    let instrucaoSql = `select * from sensor 
    inner join estufa 
    on fkEstufa=idEstufa 
    where idsensor = ${idSensor}`;

    sequelize.query(instrucaoSql, {
        model: Sensor
    }).then(resultado =>{
        console.log(`Sensores encontradas : ${resultado.length}`);
        res.json(resultado[0]);
    });

});

module.exports = router;