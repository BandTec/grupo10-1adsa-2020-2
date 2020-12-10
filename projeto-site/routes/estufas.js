var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Cliente = require('../models').Cliente;
var Usuario = require('../models').Usuario;
var LocalEstufa = require('../models').LocalEstufa;
var Estufa = require('../models').Estufa;

router.get('/estufas-usuario/:fkUsuario', (req, res, next) =>{
    console.log('Recuperando as Estufas desse Usuario..');

    var fkUsuario = req.params.fkUsuario;

    let instrucaoSql = `select idEstufa, tipoCultura from estufa 
    inner join localEstufa on fklocalEstufa = idLocalEstufa 
    where fkUsuario = ${fkUsuario}`;

    sequelize.query(instrucaoSql, {
        model: Estufa
    }).then(resultado =>{
        console.log(`Foram encontrados: ${resultado.length}`);
        res.json(resultado);

    });

});

router.get('/estufa-detalhe/:idEstufa', (req, res, next) =>{
    console.log("Recuperando dados de uma Estufa...");

    var idEstufa = req.params.idEstufa;

    let instrucaoSql = `select * from estufa where idEstufa = ${idEstufa}`;

    sequelize.query(instrucaoSql, {
        model: Estufa
    }).then(resultado =>{
        console.log(`Estufas encontradas : ${resultado.length}`);
        res.json(resultado[0]);
    });

});

module.exports = router;