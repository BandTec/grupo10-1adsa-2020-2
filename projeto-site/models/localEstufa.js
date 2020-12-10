'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let LocalEstufa = sequelize.define('LocalEstufa',{
		idLocalEstufa: {
			field: 'idLocalEstufa',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		logradouroLocal: {
			field: 'logradouroLocal',
			type: DataTypes.STRING,
			allowNull: false
		},
		cidadeLocal: {
			field: 'cidadeLocal',
			type: DataTypes.STRING,
			allowNull: false
		},
		bairroLocal: {
			field: 'bairroLocal',
			type: DataTypes.STRING,
			allowNull: false
        },
        cepLocal: {
			field: 'cepLocal',
			type: DataTypes.STRING,
			allowNull: false
        },
        complementoLocal: {
			field: 'complementoLocal',
			type: DataTypes.STRING,
			allowNull: false
        },
        numeroLocal: {
			field: 'numeroLocal',
			type: DataTypes.STRING,
			allowNull: false
        },
		fkUsuario: {
			field: 'fkUsuario',
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, 
	{
		tableName: 'localEstufa', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return LocalEstufa;
};
