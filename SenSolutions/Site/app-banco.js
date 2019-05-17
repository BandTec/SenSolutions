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
        server: "Luis Colocar seu link azure aqui",
        user: "bandtec",
        password: "Colocar sua senha aqui",
        database: "colocar o nome do banco aqui",
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
// const sql = require('mssql')
// const config = {
//     user: '',
//     password: '',
//     server: '...', // You can use 'localhost\\instance' to connect to named instance
//     database: '',

//     options: {
//         encrypt: true // Use this if you're on Windows Azure
//     }

// }
// module.exports={
//     connect(){
//         return new Promise((resolve,reject)=>{

//             sql.close();
//             sql.connect(config, err => {

//                 var request = new sql.Request()

//                 if(err){
//                     console.log(err);

//                 }else{
//                     resolve(request);

//                 }



//             });
//         });

//     }
// }