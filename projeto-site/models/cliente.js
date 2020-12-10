'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Cliente = sequelize.define('Cliente',{
		idCliente: {
			field: 'idCliente',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		tipoCliente: {
			field: 'tipoCliente',
			type: DataTypes.CHAR,
			allowNull: false
		},
		nome_RazaoSocial: {
			field: 'nome_RazaoSocial',
			type: DataTypes.STRING,
			allowNull: false
		},
		cpf_cnpj: {
			field: 'cpf_cnpj',
			type: DataTypes.STRING,
			allowNull: false
        },
        telefoneFixo: {
			field: 'telefoneFixo',
			type: DataTypes.STRING,
			allowNull: false
        },
        telefoneCelular: {
			field: 'telefoneCelular',
			type: DataTypes.STRING,
			allowNull: false
		},
		id: {
			type: DataTypes.VIRTUAL,
			allowNull: true
		}
	}, 
	{
		tableName: 'cliente', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Cliente;
};
