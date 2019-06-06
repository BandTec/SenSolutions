// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!



router.post('/cadastrar', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
    var posicaoSensor = req.body.PosicaoSensor;
    var SerialSensor = req.body.SerialSensor;

      console.log('inserindo dados no banco');
         return banco.sql.query(`Insert into tb_sensor(SerialSensor,posicaoSensor,Temp_Max,Temp_min,Umid_min,Umid_max,fkLocal) 
      values('${SerialSensor}', '${posicaoSensor}', '40', '0', '0', '100', 1)
      `);  
  }).then(consulta => {
    //console.log(`Sensores encontrados para cadastro: ${JSON.stringify(consulta.recordset)}`);

    
    res.status(200);
    res.redirect('/dashboard');
    
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







// não mexa nesta linha!
module.exports = router;