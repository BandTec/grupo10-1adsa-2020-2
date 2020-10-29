create database projeto_pi;
use projeto_pi;


create table cadastro_cliente(
	id_cliente int primary key auto_increment,
	nome_razaoSocial varchar(100) not null,
	cpf_cnpj varchar(20) not null,
    tipo char(2),
    check (tipo = 'PF' or tipo = 'PJ'),
    telefone_celular varchar(20) not null,
    telefone_fixo varchar(30)
)auto_increment=100;

create table usuario(
	id_usuario int auto_increment,
	nome varchar(100) not null,
	senha varchar(99) not null,
	email varchar(100) not null,
    fk_cliente int,
    foreign key(fk_cliente) references cadastro_cliente(id_cliente),
    primary key (id_usuario,fk_cliente)
)auto_increment=1000;

create table estufa(
	id_estufa int auto_increment,
    nome_estufa varchar(30),
    tipo_cultura varchar(40),
    fk_cliente int,
    foreign key(fk_cliente) references cadastro_cliente(id_cliente),
    primary key(id_estufa, fk_cliente)
)auto_increment=1;

create table sensor(
	id_sensor int auto_increment,
    status_sensor varchar(10) default 'ativo',
    check(status_sensor = 'ativo' or status_sensor = 'inativo' or status_sensor = 'manutencao'),
    fk_estufa int,
    foreign key(fk_estufa) references estufa(id_estufa),
    primary key(id_sensor,fk_estufa)
) auto_increment=10;
    
create table dados_sensor( 
	id_dados_sensor int auto_increment,
	registro_umidade decimal,
	registro_temp decimal,
	registro_hora datetime not null,
    fk_sensor int,
    foreign key(fk_sensor) references sensor(id_sensor),
    primary key(id_dados_sensor,fk_sensor)
)auto_increment=1;

select * from cadastro_cliente;
select * from dados_sensor;
select * from estufa;
select * from sensor;
select * from usuario;
select * from cadastro_cliente, usuario, estufa, sensor, dados_sensor;


-- Inserção de dados cliente
insert into cadastro_cliente values
(null,'Miguel Nunes','84726352635','PF', '11-94435352', '11-22345678'),
(null,'Felipe Higa','48475304893','PF', '11-97456463', '11-28934512'),
(null,'Vitória Souza','42442960850', 'PF', '11-997327321', '11-22032028'),
(null,'Victor Veniti','44573282000198','PJ', '11-955536932', '11-22623169'),
(null,'Larissa Lima','42811692000133','PJ', '11-955332235', '11-34718023'),
(null, 'Julia Mello', '4178209000123', 'PJ','11-9655323677', '11-45327891');

-- inserção de dados usuário
insert into usuario values 
(null, 'Miguel Nunes', 'saturno09', 'miguel.assuncao@bandtec.com.br', 100),
(null, 'Bernardo Gadelha', 'pizza123', 'gadelha20bernardo@hotmail.com', 101),
(null, 'Victor Veniti', 'sorvetedebaunilha', 'victor.veniti@gmail.com', 102),
(null, 'Theo Souza', 'cinema2020', 'theo1209@gmail.com', 103),
(null, 'Julia Mello', 'estrela10', 'juliamello@gmail.com', 104),
(null, 'Larissa Lima', 'ih.larilarie', 'larissa.lima@bandtec.com.br', 105);

-- inserção de dados estufa
insert into estufa values
(null, 'Estufa A', 'Alface', 100),
(null, 'Estufa B', 'Alface', 100),
(null, 'Estufa C', 'Tomate', 101),
(null, 'Estufa D', 'Alface', 102),
(null, 'Estufa E', 'Tomate', 103),
(null, 'Estufa F', 'Alface', 103),
(null, 'Estufa G', 'Tomate', 103);

-- inserção de dados sensor
insert into sensor values
(null, 'ativo', 1),
(null, 'ativo', 2),
(null, 'ativo', 3),
(null, 'ativo', 4),
(null, 'ativo', 5),
(null, 'ativo', 6),
(null, 'ativo', 6);

-- Inserção de dados dados_sensor
insert into dados_sensor values
(null, '70','25','2020-9-15 19:16:53', 10),
(null,'80','24','2020-9-15 19:29:36', 11),
(null,'69','24','2020-9-15 18:21:23', 12),
(null, '77','27','2020-9-15 17:32:36', 13),
(null, '73','26','2020-9-15 16:11:41', 14),
(null, '85','23','2020-9-15 13:45:36', 15),
(null, '50','21','2020-9-15 12:02:16', 16),
(null, '45', '18', '2020-10-26 15:00:19', 10);


-- select * from cadastro_usuario;
-- select * from sensor;
-- select * from cadastro_usuario, sensor where fk_usuario=id_usuario;


select * from sensor, dados_sensor, estufa, cadastro_cliente, usuario
where fk_sensor = id_sensor 
and fk_estufa = id_estufa 
and estufa.fk_cliente = cadastro_cliente.id_cliente
and fk_estufa = id_estufa
and usuario.fk_cliente = cadastro_cliente.id_cliente;

select estufa.nome_estufa ,sensor.status_sensor, dados_sensor.registro_umidade ,
dados_sensor.registro_temp, 
estufa.nome_estufa, cadastro_cliente.nome_razaoSocial
from sensor, dados_sensor, estufa, cadastro_cliente
where fk_sensor = id_sensor 
and fk_estufa = id_estufa 
and fk_cliente = id_cliente
and fk_estufa = id_estufa;