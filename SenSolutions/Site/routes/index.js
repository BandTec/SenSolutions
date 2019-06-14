var express = require('express');
var router = express.Router();
var banco = require('../app-banco');


/* GET home page. */
router.get('/dashboard',function(req,res,next){
  
  banco.conectar().then(  () => {
  
    return banco.sql.query(`select * from tb_cliente
                full
                 join tb_local on idCliente = FkCLiente
                full
                 join tb_endereco on idEndereco = fkEndereco
                full
                 join tb_sensor on idlocal = fkLocal `);
  }).then(consulta => {
 
    res.render('dashboard',{results:consulta.recordset});
  
  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.sendStatus(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});
router.get('/dashboard/todos',function(req,res,next){
  
  banco.conectar().then(() => {
  
    return banco.sql.query(`select * from tb_cliente left join tb_local on idCliente = FkCLiente
left join tb_endereco on idEndereco = fkEndereco
left join tb_sensor on idlocal = fkLocal 
`);
  }).then(consulta => {
 
    res.render('dashboard',{results:consulta.recordset});
  
  }).catch(err => {

    var erro = `Erro na leitura dos últimos registros: ${err}`;
    console.error(erro);
    res.sendStatus(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});



module.exports = router;
