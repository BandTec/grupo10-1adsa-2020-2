var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Cliente = require('../models').Cliente;
var Usuario = require('../models').Usuario;

let sessoes = [];

/* Recuperar usuário por login e senha */
router.post('/autenticar', function(req, res, next) {
    console.log('Recuperando usuário por login e senha');

    var email = req.body.email_Login; // depois de .body, use o nome (name) do campo em seu formulário de login
    var senha = req.body.senha_Login; // depois de .body, use o nome (name) do campo em seu formulário de login	

    let instrucaoSql = `select * from usuario where emailusuario='${email}' and senhaUsuario='${senha}'`;
    console.log(instrucaoSql);

    sequelize.query(instrucaoSql, {
        model: Usuario
    }).then(resultado => {
        console.log(`Encontrados: ${resultado.length}`);

        if (resultado.length == 1) {
            sessoes.push(resultado[0].dataValues.emailusuario);
            console.log('sessoes: ', sessoes);
            res.json(resultado[0]);
        } else if (resultado.length == 0) {
            res.status(403).send('Login e/ou senha inválido(s)');
        } else {
            res.status(403).send('Mais de um usuário com o mesmo login e senha!');
        }

    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

/* router.get('/testarUsuario', (req, res) =>{
	console.log('Testando..');

	let instrucaoSql = 'select top 1 idCliente from cliente order by idCliente desc';
		
	sequelize.query(instrucaoSql, {
		model: Cliente
	}).then(resultado =>{
		res.send({
			result: resultado[0].dataValues
		});
	}).catch(erro =>{
		console.error(erro);
		res.status(500).send(erro.message);
	});

}); */

/* Cadastrar usuário */
router.post('/cadastrar', function(req, res, next) {
    console.log('Criando um usuário');

    var tipo;

    if (req.body.cpfCpnjCliente.length == 11) {
        tipo = "pf";
    } else {
        tipo = "pj";
    }


    Cliente.create({
        tipoCliente: tipo,
        nome_RazaoSocial: req.body.nomeRazaoSocial,
        cpf_cnpj: req.body.cpfCpnjCliente,
        telefoneFixo: req.body.telefoneCliente,
        telefoneCelular: req.body.telefoneCelularCliente
    }).then(resultado => {

        console.log('Cliente Criado com sucesso');
        console.log('Criando Usuario');

        let instrucaoSql = 'select MAX(idCliente) as id from cliente';

        sequelize.query(instrucaoSql, {
            model: Cliente
        }).then(resultado => {

            console.log('Usuario Criado com sucesso');

            Usuario.create({
                nomeUsuario: req.body.nomeUsuario,
                emailusuario: req.body.emailUsuario,
                senhaUsuario: req.body.senhaUsuario,
                fkcliente: resultado[0].dataValues.id
            }).then(resultado => {
                console.log('Usuario Criado com sucesso');
                res.send(resultado);
            }).catch(erro => {
                console.error(erro);
                res.status(500).send(erro.message);
            });

        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });

    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });

});


/* Verificação de usuário */
router.get('/sessao/:email', function(req, res, next) {
    let email = req.params.email;
    console.log(`Verificando se o usuário ${email} tem sessão`);

    let tem_sessao = false;
    for (let u = 0; u < sessoes.length; u++) {
        if (sessoes[u] == email) {
            tem_sessao = true;
            break;
        }
    }

    if (tem_sessao) {
        let mensagem = `Usuário ${email} possui sessão ativa!`;
        console.log(mensagem);
        res.send(mensagem);
    } else {
        res.sendStatus(403);
    }

});


/* Logoff de usuário */
router.get('/sair/:email', function(req, res, next) {
    let email = req.params.email;
    console.log(`Finalizando a sessão do usuário ${email}`);
    let nova_sessoes = []
    for (let u = 0; u < sessoes.length; u++) {
        if (sessoes[u] != email) {
            nova_sessoes.push(sessoes[u]);
        }
    }
    sessoes = nova_sessoes;
    res.send(`Sessão do usuário ${email} finalizada com sucesso!`);
});


/* Recuperar todos os usuários */
router.get('/', function(req, res, next) {
    console.log('Recuperando todos os usuários');
    Usuario.findAndCountAll().then(resultado => {
        console.log(`${resultado.count} registros`);

        res.json(resultado.rows);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});


// Atualização de dados do perfil
router.get('/atualizar_perfil/:id_usuario', function(req, res, next) {
    console.log('Recuperando dados dos usuários');
    var id = req.params.id_usuario;
    let instrucaoSql = `select * from usuario where idUsuario = ${id}`;
    sequelize.query(instrucaoSql, {
        model: Usuario
    }).then(resultado => {
        console.log(`Encontradas ${resultado.length}`);
        res.json(resultado[0]);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });;

});

router.post('/alterar_dados/:id_usuario', function(req, res, next) {
    console.log('Atualizando dados do usuario');
    var id = req.params.id_usuario;
    var nome = req.body.in_nome;
    var email = req.body.in_email;
    var senha = req.body.in_senha;
    let instrucaoSql = `update usuario set nomeUsuario = '${nome}', emailusuario = '${email}', senhaUsuario = '${senha}' where idUsuario = ${id}`;
    sequelize.query(instrucaoSql, {
        model: Usuario
    }).then(resultado => {
        console.log(`Usuário atualizado com sucesso`);
        sessoes.shift()
        sessoes.push(email)
        var dadoNovo = {
            idUsuario: id,
            nomeUsuario: nome,
            emailusuario: email,
            senhaUsuario: senha
        }
        console.log(`Sessão nova criada: ${sessoes}`);
        res.json(dadoNovo);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
})

module.exports = router;