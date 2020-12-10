'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Sensor = sequelize.define('Sensor',{	
		id: {
			field: 'idSensor',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
		temperatura: {
			field: 'statusSensor',
			type: DataTypes.STRING,
			allowNull: false
		},
		umidade: {
			field: 'fkEstufa',
			type: DataTypes.INTEGER,
			allowNull: false
		}
}, 
	{
		tableName: 'sensor', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Sensor;
};