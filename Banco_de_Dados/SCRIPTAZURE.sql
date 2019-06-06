-- select *
-- from tb_cliente 
--     full join tb_local on idCliente = FkCLiente
--     full join tb_endereco on idEndereco = fkEndereco
--     full join tb_sensor on idlocal = fkLocal


-- select *
-- from tb_cliente;

-- select *
-- from tb_endereco;
-- insert into tb_local
-- values
--     ('188', 'Casa 1', 1, 1);

-- delete from tb_cliente;

/* Criando as tabelas do banco */
CREATE TABLE tb_Cliente
(
    idCliente int PRIMARY KEY identity,
    nomeUsuario varchar(40),
    senhaUsuario varchar(40),
    Email varchar(40)
) go
CREATE TABLE tb_Local
(
    idLocal int PRIMARY KEY identity,
    numero varchar(10),
    complemento varchar(40),
    fkCliente int,
    fkEndereco int,
    FOREIGN KEY(fkCliente) REFERENCES tb_Cliente (idCliente)
) go
CREATE TABLE tb_Sensor
(
    idSensor int PRIMARY KEY identity,
    SerialSensor varchar(40),
    posicaoSensor varchar(40),
    Temp_Max varchar(10),
    Temp_Min varchar(10),
    Umid_Min varchar(10),
    Umid_Max varchar(10),
    fkLocal int
) go
CREATE TABLE tb_Endereco
(
    idEndereco int PRIMARY key identity,
    CEP varchar(20) ,
    logradouro varchar(40),
    ufEstado varchar(40),
    bairro varchar(40),
    cidade varchar(40)
) go
CREATE TABLE tb_Eventos
(
    idTemp_Umid int PRIMARY KEY identity,
    Temperatura float,
    Umidade float,
    dataHora datetime,
    fkSensor int
) go


ALTER TABLE tb_Local ADD FOREIGN KEY(fkEndereco) REFERENCES tb_Endereco (idEndereco)go
ALTER TABLE tb_Eventos ADD FOREIGN KEY(fkSensor) REFERENCES tb_Sensor (idSensor)go
alter table tb_Sensor add foreign key (fkLocal) references tb_Local(idLocal)go


-- drop database sensolutionsgo

-- delete from tb_Local where idLocal = 1 go

/* Comandos para dropar as tabelas do banco */
/*
drop table tb_eventos
drop table tb_sensor
drop table tb_local
drop table tb_endereco
drop table tb_cliente
*/