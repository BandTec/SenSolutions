var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
const sms = require("../Utils/apiSms");

router.get('/ultimas', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
  
    var limite_linhas = 5;
    return banco.sql.query(`select top ${limite_linhas}  
                            temperatura, 
                            umidade, 
                            FORMAT(dataHora,'HH:mm:ss') as dataHora 
                            from tb_eventos order by idtemp_umid desc`);
  }).then(consulta => {

    console.log(consulta.recordset);
    res.send(consulta.recordset);

  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.sendStatus(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.get('/estatisticas', function (req, res, next) {
  console.log(banco.conexao);

  var estatisticas = {
    temp_maxima: 0, 
    temp_minima: 0, 
    temp_media: 0,
    umid_maxima:0,
    umid_minima:0,
    umid_media:0
  };

//  chamada da API DE SMS NAO  TIRAR O COMENTARIO DESSE CODIGO!
//  sms(); 
  banco.conectar().then(() => {
    return banco.sql.query(`
    select 
    max(temperatura) as temp_maxima, 
    min(temperatura) as temp_minima, 
    avg(temperatura) as temp_media,
    max(umidade) as umid_maxima,
    min(umidade) as umid_minima,
    avg(umidade) as umid_media
      from tb_eventos
        `);
  }).then(consulta => {
    estatisticas.temp_maxima = consulta.recordset[0].temp_maxima;
    estatisticas.temp_minima = consulta.recordset[0].temp_minima;
    estatisticas.temp_media = consulta.recordset[0].temp_media;
    estatisticas.umid_maxima = consulta.recordset[0].umid_maxima;
    estatisticas.umid_minima = consulta.recordset[0].umid_minima;
    estatisticas.umid_media = consulta.recordset[0].umid_media;
    console.log(`Estatísticas: ${JSON.stringify(estatisticas)}`);
   
    res.send(estatisticas);
 
  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});




// não mexa nesta linha!
module.exports = router;
