	'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Usuario = sequelize.define('Usuario',{
		idUsuario: {
			field: 'idUsuario',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nomeUsuario: {
			field: 'nomeUsuario',
			type: DataTypes.STRING,
			allowNull: false
		},
		emailusuario: {
			field: 'emailusuario',
			type: DataTypes.STRING,
			allowNull: false
		},
		senhaUsuario: {
			field: 'senhaUsuario',
			type: DataTypes.STRING,
			allowNull: false
		},
		fkcliente: {
			field: 'fkcliente',
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, 
	{
		tableName: 'usuario', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Usuario;
};
