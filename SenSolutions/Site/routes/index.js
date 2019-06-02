var express = require('express');
var router = express.Router();
var banco = require('../app-banco');


/* GET home page. */
router.get('/dashboard',function(req,res,next){
  
  banco.conectar().then(() => {
  
    var limite_linhas = 5;
   
    return banco.sql.query(`select *  from tb_endereco`);
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
