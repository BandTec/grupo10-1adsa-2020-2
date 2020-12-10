create table cliente(
    idCliente int primary key identity(100, 1),
    tipoCliente char(2) check(tipoCliente = 'pf' or tipoCliente = 'pj'),
    nome_RazaoSocial varchar (100),
    cpf_cnpj varchar (14),
	telefoneFixo varchar (30),
	telefoneCelular varchar (20)
);

create table usuario(
    idUsuario int primary key identity(1000, 1),
    nomeUsuario varchar (50),
	emailusuario varchar (100),
	senhaUsuario varchar (100),
    fkcliente int foreign key references cliente(idCliente)
);

create table localEstufa (
	idLocalEstufa int primary key identity(5000, 1),
	logradouroLocal varchar (50),
	cidadeLocal varchar (40),
	bairroLocal  varchar (30),
	cepLocal varchar (15),
	complementoLocal varchar (25),
	numeroLocal varchar (10),
	fkUsuario int foreign key references usuario(idusuario)
);

create table estufa (
	idEstufa int primary key identity(8000, 1),
	tipoCultura varchar (30),
	temperaturaMaxima decimal (3,1),
	temperaturaMinima decimal (3,1),
	umidadeMaxima int,
	umidadeMinima int,
	fklocalEstufa int foreign key references localEstufa(idLocalEstufa),
);

create table sensor(
	idSensor int primary key identity(30000,1),
	statusSensor varchar (40) check (statusSensor = 'Ativo' or statusSensor = 'Inativo' or statusSensor = 'Em manutenção'),
	fkestufa int foreign key references estufa(idEstufa)  
);
create table dadosSensor (
	idDadosSensor int primary key identity,
	registroUmidade decimal (3,1),
	registroTemperatura decimal (3,1),
	fksensor int foreign key references sensor(idSensor)
);
create table acesso(
    fkUsuario int foreign key references usuario(idusuario),
    fkEstufa int foreign key references estufa(idestufa),
    primary key(fkUsuario,fkEstufa),
    cargo varchar(45)
);