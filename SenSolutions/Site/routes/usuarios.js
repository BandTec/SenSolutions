// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!


// var UsuariosModel = require('../model/UsuariosModel');
// var RespostaClass = require('../Model/RespostaClass');

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

    if (consulta.recordset.length==1) {
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

  banco.conectar().then(() => {
    console.log(`Chegou p/ login: ${JSON.stringify(req.body)}`);
    // var login = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
    // var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login
    var nomeCadastro = req.body.nomeCompleto;
    var emailCadastro = req.body.emailCad;
    var senhaCadastro = req.body.senhaCad;
    var senhaCadastro2 = req.body.senhaCad2;


    if (nomeCadastro == undefined || emailCadastro == undefined || senhaCadastro == undefined || senhaCadastro2 == undefined) {
      throw new Error(`Dados de cadastro não chegaram completos: ${nomeCadastro} / ${emailCadastro} / ${senhaCadastro} / ${senhaCadastro2}`);
    } else if (senhaCadastro != senhaCadastro2) {
       console.log(`Senhas incorretas! Digite a senha novamente!`);
    }
    return banco.sql.query(`Insert into tb_cliente(nomeUsuario,senhaUsuario,Email) values ('${nomeCadastro}','${senhaCadastro}','${emailCadastro}');`);
  }).then(consulta => {

    console.log(`Cadastro realizado com Sucesso !: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length == 1) {
      res.send(consulta.recordset[0]);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro no Cadastro: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});





// router.get('/', function (req, res, next) {

//     UsuariosModel.getTodos(function (erro, retorno) {

//         let resposta = new RespostaClass();
//         if (erro) {
//             resposta.erro = true;
//             resposta.msg = "Ocorreu um erro.";
//             console.log("erro", erro);
//         }
//         else resposta.dados = retorno;
//         res.json(resposta);
//     });
// });


// router.get('/:id?', function (req, res, next) {

//     UsuariosModel.getId(req.params.id, function (erro, retorno) {

//         let resposta = new RespostaClass();

//         if (erro) {
//             resposta.erro = true;
//             resposta.msg = "Ocorreu um erro.";
//             console.log("erro", erro);
//         }
//         else
//             resposta.dados = retorno;
//         res.json(resposta);
//     });
// });

// router.post('/', function (req, res, next) {

//     UsuariosModel.adicionar(req.body, function (erro, retorno) {

//         let resposta = new RespostaClass();

//         if (erro) {
//             resposta.erro = true;
//             resposta.msg = "Ocorreu um erro.";
//             console.log("erro", erro);
//         }
//         else {
//             if (retorno.affectedRows > 0) {
//                 resposta.msg = "cadastro realizado com sucesso";
//             } else {
//                 resposta.erro = true;
//                 resposta.msg = "Não foi realziar o cadastro";
//             }
//         }
//         console.log('resp cadastrar', resposta);
//         res.json(resposta);
//     });
// });



// router.delete('/:id', function (req, res, next) {

//     UsuariosModel.deletar(req.params.id, function (erro, retorno) {

//         let resposta = new RespostaClass();

//         if (erro) {
//             resposta.erro = true;
//             resposta.msg = "Ocorreu um erro.";
//             console.log("erro", erro);
//         }
//         else {
//             if (retorno.affectedRows > 0) {
//                 resposta.msg = "registro excluído com sucesso";
//             } else {
//                 resposta.erro = true;
//                 resposta.msg = "Não foi possível excluir o registro";
//             }
//         }
//         res.json(resposta);
//     });
// });

// router.put('/', function (req, res, next) {

//     UsuariosModel.editar(req.body, function (erro, retorno) {

//         let resposta = new RespostaClass();

//         if (erro) {
//             resposta.erro = true;
//             resposta.msg = "Ocorreu um erro.";
//             console.log("erro", erro);
//         }
//         else {
//             if (retorno.affectedRows > 0) {
//                 resposta.msg = "registro alterado com sucesso";
//             } else {
//                 resposta.erro = true;
//                 resposta.msg = "Não foi possível alterar o registro";
//             }
//         }
//         res.json(resposta);
//     });

// });


// não mexa nesta linha!
module.exports = router;