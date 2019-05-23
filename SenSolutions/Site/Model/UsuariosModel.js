var db = require('../app-banco');

module.exports = class UsuariosModel{

    static getTodos(callback){
        return db.query("SELECT * FROM tb_cliente", callback);
    }

    static getId(id, callback) {
        return db.query("SELECT * FROM tb_cliente WHERE idCliente=?", [idcliente], callback);
    }

    static adicionar(portfolio, callback) {

        return db.query("INSERT INTO tb_cliente (descricao, detalhes) VALUES(?,?)", 
        [portfolio.descricao, portfolio.detalhes], callback);        
    }

    static deletar(id, callback) {
        return db.query("DELETE FROM tb_cliente WHERE  idCliente=?", [id], callback);
    }

    static editar(portfolio, callback) {
        return db.query("UPDATE tb_cliente SET descricao=?, detalhes=? WHERE  idCliente=?", 
        [portfolio.descricao, portfolio.detalhes, portfolio.id_portfolio], callback); 
    }

};