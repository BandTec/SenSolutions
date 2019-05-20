var express = require('express');
var router = express.Router();
var banco = require('../app-banco');

router.get('/ultimas', function (req, res, next) {
  console.log(banco.conexao);
  banco.conectar().then(() => {
<<<<<<< HEAD
    var limite_linhas = 5;
=======
    var limite_linhas = 8;
>>>>>>> 127f4eef673c276ce19241ee8f989927b8d0c994
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
    temp_media: 0
  };

  banco.conectar().then(() => {
    return banco.sql.query(`
        select 
          max(temperatura) as temp_maxima, 
          min(temperatura) as temp_minima, 
          avg(temperatura) as temp_media 
        from tb_eventos
        `);
  }).then(consulta => {
    estatisticas.temp_maxima = consulta.recordset[0].temp_maxima;
    estatisticas.temp_minima = consulta.recordset[0].temp_minima;
    estatisticas.temp_media = consulta.recordset[0].temp_media;
    console.log(`Estatísticas: ${estatisticas}`);
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
