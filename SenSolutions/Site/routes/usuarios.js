// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!



router.post('/entrar', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ login: ${JSON.stringify(req.body)}`);
    var login = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
    var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login
    if (login == undefined || senha == undefined) {
      throw new Error(`Dados de login não chegaram completos: ${login} / ${senha}`);
    }
    return banco.sql.query(`select * from tb_cliente where email='${login}' and senhaUsuario='${senha}'`);
  }).then(consulta => {

    console.log(`Usuários encontrados: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length == 1) {
      res.send(consulta.recordset[0]);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.post('/cadastrar', function (req, res, next) {
  
  // var nomeCadastro = req.body.nomeCompleto;
  // var emailCadastro = req.body.emailCad;
  // var senhaCadastro = req.body.senhaCad;
  // var senhaCadastro2 = req.body.senhaCad2;



  banco.conectar().then(() => {
    // if (nomeCadastro == undefined || emailCadastro == undefined || senhaCadastro == undefined || senhaCadastro2 == undefined) {
    //   throw new Error(`Dados de cadastro não chegaram completos: ${nomeCadastro} / ${emailCadastro} / ${senhaCadastro} / ${senhaCadastro2}`);
    // } else if (senhaCadastro != senhaCadastro2) {
    //   console.log(`Senhas incorretas! Digite a senha novamente!`);
    // }
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.query)}`);
    var json = req.query;
    return banco.sql.query(`Insert into tb_cliente(nomeUsuario,senhaUsuario,Email) values ('${json.user}','${json.password}','${json.email}')`);
  }).then(consulta => {

    res.status(200);
    res.send('ok');

  }).catch(err => {
    var erro = `Erro no login: ${err}`;
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

    return banco.sql.query(`Select * from tb_cliente where idcliente = ${json.id};`);
  }).then(consulta => {

    console.log(consulta.recordset)
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