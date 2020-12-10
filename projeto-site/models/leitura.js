'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Leitura = sequelize.define('Leitura',{	
		idDadosSensor: {
			field: 'idDadosSensor',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
		registroUmidade: {
			field: 'registroUmidade',
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		registroTemperatura: {
			field: 'registroTemperatura',
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		dataHora: {
			field: 'dataHora',
			type: DataTypes.DATE, // NÃO existe DATETIME. O tipo DATE aqui já tem data e hora
			allowNull: false
		},
		fksensor: {
			field: 'fksensor',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		momento_grafico: {
			type: DataTypes.VIRTUAL, // campo 'falso' (não existe na tabela). Deverá ser preenchido 'manualmente' no select
			allowNull: true
		}
	}, 
	{
		tableName: 'dadosSensor', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Leitura;
};
