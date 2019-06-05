var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
var sms = require('../Utils/apiSms')

router.get('/ultimas', function (req, res, next) {
  console.log(banco.conexao);
  var dados_atuais ={
    temp_atual:0,
    umid_atual:0
  }
  banco.conectar().then(() => {
  
    var limite_linhas = 10;
   
    return banco.sql.query(`select top ${limite_linhas} temperatura,  umidade, 
    FORMAT(dataHora AT TIME ZONE 'UTC' AT TIME 
    ZONE 'E. South America Standard Time','HH:mm:ss') as momento 
    from tb_eventos order by idtemp_umid desc;`);
  }).then(consulta => {
    dados_atuais.temp_atual = consulta.recordset[0].temperatura;
    dados_atuais.umid_atual = consulta.recordset[0].umidade;
 if(dados_atuais.temp_atual < 16 || dados_atuais.temp_atual > 28 || dados_atuais.umid_atual < 45 || dados_atuais.umid_atual >71){
   console.log('Enviou dados');
  // sms();
 }
    console.log(consulta.recordset);
    console.log(`Dados atuais: ${JSON.stringify(dados_atuais)}`);
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
    temp_maxima:0, 
    temp_minima:0, 
    temp_priQ :0,
    temp_segQ :0,
    temp_terQ :0,
    umid_maxima:0, 
    umid_minima:0, 
    umid_priQ :0,
    umid_segQ :0,
    umid_terQ :0
  };

  banco.conectar().then(() => {
    
    return banco.sql.query(`SELECT DISTINCT MIN(CAST([temperatura] AS FLOAT)) OVER(PARTITION BY 1) AS [temp_minima],
    PERCENTILE_CONT(0.25) WITHIN GROUP(ORDER BY CAST([temperatura] AS FLOAT)) OVER(PARTITION BY 1) AS [temp_priQ],
    PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY CAST([temperatura] AS FLOAT)) OVER(PARTITION BY 1) AS [temp_segQ],
    PERCENTILE_CONT(0.75) WITHIN GROUP(ORDER BY CAST([temperatura] AS FLOAT)) OVER(PARTITION BY 1) AS [temp_terQ],
    MAX(CAST([temperatura] AS FLOAT)) OVER(PARTITION BY 1) AS [temp_maxima],
     MIN(CAST([umidade] AS FLOAT)) OVER(PARTITION BY 1) AS [umid_minima],
    PERCENTILE_CONT(0.25) WITHIN GROUP(ORDER BY CAST([umidade] AS FLOAT)) OVER(PARTITION BY 1) AS [umid_priQ],
    PERCENTILE_CONT(0.5) WITHIN GROUP(ORDER BY CAST([umidade] AS FLOAT)) OVER(PARTITION BY 1) AS [umid_segQ],
    PERCENTILE_CONT(0.75) WITHIN GROUP(ORDER BY CAST([umidade] AS FLOAT)) OVER(PARTITION BY 1) AS [umid_terQ],
    MAX(CAST([umidade] AS FLOAT)) OVER(PARTITION BY 1) AS [umid_maxima] FROM tb_eventos;`);
    // (`
    // select 
    // max(temperatura) as temp_maxima, 
    // min(temperatura) as temp_minima, 
    // avg(temperatura) as temp_media,
    // max(umidade) as umid_maxima,
    // min(umidade) as umid_minima,
    // avg(umidade) as umid_media
    //   from tb_eventos
    //     `);

  }).then(consulta => {
    estatisticas.temp_maxima = consulta.recordset[0].temp_maxima;
    estatisticas.temp_minima = consulta.recordset[0].temp_minima;
    estatisticas.temp_priQ = consulta.recordset[0].temp_priQ;
    estatisticas.temp_segQ = consulta.recordset[0].temp_segQ;
    estatisticas.temp_terQ = consulta.recordset[0].temp_terQ;
    estatisticas.umid_maxima = consulta.recordset[0].umid_maxima;
    estatisticas.umid_minima = consulta.recordset[0].umid_minima;
    estatisticas.umid_priQ = consulta.recordset[0].umid_priQ;
    estatisticas.umid_segQ = consulta.recordset[0].umid_segQ;
    estatisticas.umid_terQ = consulta.recordset[0].umid_terQ;
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
