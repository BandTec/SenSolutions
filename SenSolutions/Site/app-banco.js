var desenvolvimento = false;

var configuracoes = {
    producao: {
        server: "projetohardesk.database.windows.net",
        user: "bandtec",
        password: "#Gf37843888845",
        database: "BancoProjeto",
        options: {
            encrypt: true
        },
        pool: {
            max: 4,
            min: 1,
            idleTimeoutMillis: 30000
        }
    },
    desenvolvimento: {
        server: "projetovialactea.database.windows.net",
        user: "bandtec",
        password: "Localhost123",
        database: "BancoProjeto",
        options: {
            encrypt: true
        }
    }
}

var sql = require('mssql');
sql.on('error', err => {
    console.error(`Erro de Conexão: ${err}`);
});

var perfil = desenvolvimento ? 'desenvolvimento' : 'producao';

function conectar() {
    return sql.connect(configuracoes[perfil])
    // return new sql.ConnectionPool();  
}
module.exports = {
    conectar: conectar,
    sql: sql
}

