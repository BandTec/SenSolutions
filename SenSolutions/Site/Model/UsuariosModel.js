var db = require('../app-banco');

module.exports = class UsuariosModel{

    static getTodos(callback){
        return db.query("SELECT * FROM tb_cliente", callback);
    }

    static getId(id, callback) {
        return db.query("SELECT * FROM tb_cliente WHERE idCliente=?", [id], callback);
    }

    static adicionar(tb_cliente, callback) {

        return db.query("INSERT INTO tb_cliente (nomeUsuario, senhaUsuario,Email) VALUES(?,?,?)",
        [tb_cliente.nomeUsuario, tb_cliente.senhaUsuario,tb_cliente.Email], callback);
    }

    static deletar(id, callback) {
        return db.query("DELETE FROM tb_cliente WHERE  idCliente=?", [id], callback);
    }

    static editar(tb_cliente, callback) {
        return db.query("UPDATE tb_cliente SET nomeUsuario=?, senhaUsuario=?,Email=? WHERE  idCliente=?",
        [tb_cliente.nomeUsuario, tb_cliente.senhaUsuario, tb_cliente.Email, tb_cliente.id_portfolio], callback);
    }

};