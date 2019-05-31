/* Criando as tabelas do banco */
CREATE  TABLE  tb_Cliente (
idCliente int PRIMARY KEY identity,
nomeUsuario varchar(40),
senhaUsuario varchar(40),
Email varchar(40)
) go
CREATE TABLE tb_Local (
idLocal int PRIMARY KEY identity,
numero varchar(10),
complemento varchar(40),
fkCliente int,
fkEndereco int,
FOREIGN KEY(fkCliente) REFERENCES tb_Cliente (idCliente)
) go
CREATE TABLE tb_Sensor (
idSensor int PRIMARY KEY identity,
SerialSensor varchar(40),
posicaoSensor varchar(40),
Temp_Max varchar(10),
Temp_Min varchar(10),
Umid_Min varchar(10),
Umid_Max varchar(10),
fkLocal int
) go
CREATE TABLE tb_Endereco (
idEndereco int PRIMARY key identity,
CEP varchar(20) ,
logradouro varchar(40),
ufEstado varchar(40),
bairro varchar(40),
cidade varchar(40)
) go
CREATE TABLE tb_Eventos (
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
    drop table tb_Local
    drop TABLE tb_Cliente
    drop table tb_Eventos
    drop table tb_Sensor
    drop table tb_Endereco
 
*/