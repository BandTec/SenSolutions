// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!



router.post('/cadastrar', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
    var json = req.body;
      console.log('inserindo dados no banco');
         return banco.sql.query(`Insert into tb_sensor(SerialSensor,posicaoSensor,fkLocal) 
      values ('${json.serialSensor}','${json.posicaoSensor}',1)`);  
  }).then(consulta => {
    
    res.status(200);
    res.redirect('/dashboard')
    
    console.log(consulta);
  }).catch(err => {
    var erro = `Erro no cadastro: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});

router.get('/', function (req, res, next) {
 
  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.query)}`);
    var json = req.query;
    return banco.sql.query(`Select * from tb_sensor where idSensor = ${json.id};`);
  }).then(consulta => {

    console.log(json);
    res.status(200);
    res.send(consulta.recordset);
  }).catch(err => {
    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});

// router.get('/teste', function (req, res, next) {
 
//   banco.conectar().then(() => {
//     console.log(`Chegou p/ cadastro: ${JSON.stringify(req.query)}`);
//     var json = req.query;
//     return banco.sql.query(`Select * from tb_local where idLocal = ${json.id};`);
//   }).then(consulta => {

//     console.log(json);
//     res.status(200);
//     res.send(consulta.recordset);
//   }).catch(err => {
//     var erro = `Erro na requisição : ${err}`;
//     console.error(erro);
//     res.status(500).send(erro);

//   }).finally(() => {
//     banco.sql.close();
//   });
// });

router.get('/todos', function (req, res, next) {
  console.log(banco.conexao);
  
  banco.conectar().then(() => {

    return banco.sql.query(`select  
                             * 
                             from tb_sensor  `);
  }).then(consulta => {
    console.log(consulta.recordset);
    res.send(consulta.recordset);
  }).catch(err => {
    var erro = `Erro para trazer os dados cadastrados: ${err}`;
    console.error(erro);
    res.sendStatus(500).send(erro);
  }).finally(() => {
    banco.sql.close();
  });
});


// router.get('/todosensores', function (req, res, next) {
//   console.log(banco.conexao);
  
//   banco.conectar().then(() => {

//     return banco.sql.query(`select  
//                              * 
//                              from tb_sensor  `);
//   }).then(consulta => {
//     console.log(consulta.recordset);
//     res.send(consulta.recordset);
//   }).catch(err => {
//     var erro = `Erro para trazer os dados cadastrados: ${err}`;
//     console.error(erro);
//     res.sendStatus(500).send(erro);
//   }).finally(() => {
//     banco.sql.close();
//   });
// });

// router.get('/todos', function (req, res, next) {
//   console.log(banco.conexao);
  
//   banco.conectar().then(() => {

//     return banco.sql.query(`select  
//                              * 
//                              from tb_Sensor  `);
//   }).then(consulta => {
//     console.log(consulta.recordset);
//     res.send(consulta.recordset);
//   }).catch(err => {
//     var erro = `Erro para trazer os dados cadastrados: ${err}`;
//     console.error(erro);
//     res.sendStatus(500).send(erro);
//   }).finally(() => {
//     banco.sql.close();
//   });
// });

// não mexa nesta linha!
module.exports = router;