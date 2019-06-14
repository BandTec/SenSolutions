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
router.post('/cadastrarUsu', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    console.log('inserindo dados no banco');
    return banco.sql.query(`Insert into tb_cliente(nomeUsuario,senhaUsuario,Email) 
      values ('${nome}','${senha}','${email}')`);
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

router.post('/cadastrar', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.query)}`);
    var json = req.query;
    
      console.log('inserindo dados no banco');
      return banco.sql.query(`Insert into tb_cliente(nomeUsuario,senhaUsuario,Email) 
      values ('${json.user}','${json.password}','${json.email}')`);
    
    
  }).then(consulta => {
    console.log(consulta.recordset);
    
    res.status(200);
    res.send('ok');

  }).catch(err => {
    var erro = `Erro no cadastro+: ${err}`;
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
    return banco.sql.query(`Select * from tb_cliente where idcliente = ${json.idcliente};`);
  }).then(consulta => {

    console.log(consulta.recordset);
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
router.get('/todos', function (req, res, next) {
  console.log(banco.conexao);
  
  banco.conectar().then(() => {

    return banco.sql.query(`select  
                             idcliente as 'Codigo',
                             nomeUsuario as 'Nome' ,
                             email as 'Email' 
                             from tb_cliente order by idcliente  `);
    //  para trazer os top 8 cadastros 
    // var limite_linhas = 8;
    // return banco.sql.query(`select top ${limite_linhas} 
    //                         idcliente as 'Codigo',
    //                         nomeUsuario as 'Nome',
    //                         email                     
    //                         from tb_cliente order by idcliente  `);
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

router.delete('/delete/:id', function(req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ Deletar: ${JSON.stringify(req.params.id)}`);
    var json = req.params.id;
    // console.log(`Chegou p/ Deletar: ${json}`);
    return banco.sql.query(`delete from tb_cliente where idcliente = ${json}`);
  }).then(consulta => {
    
  
    res.status(200);
    res.send(consulta.recordset);
  }).catch(err => {
    var erro = `Erro no delete: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });
});
 


// router.post('/cadastrar', function (req, res, next) {

//   var cadastro_valido = false;

//   banco.conectar().then(() => {
//     console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);
//     nome = req.body.nomeCompleto; // depois de .body, use o nome (name) do campo em seu formulário de login
//     login = req.body.emailCad; // depois de .body, use o nome (name) do campo em seu formulário de login
//     senha = req.body.senhaCad; // depois de .body, use o nome (name) do campo em seu formulário de login
   
//     if (login == undefined || senha == undefined || nome == undefined) {
// 	  // coloque a frase de erro que quiser aqui. Ela vai aparecer no formulário de cadastro
//       throw new Error(`Dados de cadastro não chegaram completos: ${login} / ${senha} / ${nome }`);
//     }
//     return banco.sql.query(`select count(*) as contagem from tb_cliente where email = '${login}'`);
//   }).then(consulta => {

// 	if (consulta.recordset[0].contagem >= 1) {
//     res.status(400).send(`Já existe usuário com o login "${login}"`);
// 		return;
//     } else {
// 		console.log('válido!');
// 		cadastro_valido = true;
// 	}
//   }).catch(err => {

//     var erro = `Erro no cadastro: ${err}`;
//     console.error(erro);
//     res.status(500).send(erro);

//   }).finally(() => {
// 	  if (cadastro_valido) {		  
//     banco.sql.query(`insert into tb_cliente (nomeUsuario, senhaUsuario, Email) 
//     values ('${nome}','${senha}','${login}')`).then(function () {
// 			console.log(`Cadastro criado com sucesso!`);
// 			res.sendStatus(201); 
// 			// status 201 significa que algo foi criado no back-end, 
//         // no caso, um registro de usuário ;) 
//       res.redirect('/login.html');
// 		}).catch(err => {

// 			var erro = `Erro no cadastro: ${err}`;
// 			console.error(erro);
// 			res.status(500).send(erro);

// 		}).finally(() => {
// 			banco.sql.close();
// 		});
// 	  }
//   });
// });

// não mexa nesta linha!
module.exports = router;