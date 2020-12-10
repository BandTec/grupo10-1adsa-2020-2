'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Estufa = sequelize.define('Estufa',{
		idEstufa: {
			field: 'idEstufa',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		tipoCultura: {
			field: 'tipoCultura',
			type: DataTypes.STRING,
			allowNull: false
		},
		temperaturaMaxima: {
			field: 'temperaturaMaxima',
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		temperaturaMinima: {
			field: 'temperaturaMinima',
			type: DataTypes.DECIMAL,
			allowNull: false
        },
        umidadeMaxima: {
			field: 'umidadeMaxima',
			type: DataTypes.INTEGER,
			allowNull: false
        },
        umidadeMinima: {
			field: 'umidadeMinima',
			type: DataTypes.INTEGER,
			allowNull: false
        },
		fklocalEstufa: {
			field: 'fklocalEstufa',
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, 
	{
		tableName: 'estufa', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Estufa;
};
