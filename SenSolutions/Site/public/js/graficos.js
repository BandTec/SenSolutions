


var usuario;
var exibiu_graficoTemp = false;
var exibiu_graficoUmid = false;


// Não mexa nestas 3 linhas! 
// google.load('visualization', '1', {
// packages: ['corechart','line'],
// callback: obterDadosGrafico
// });
function verificarAutenticacao() {
    usuario = sessionStorage.usuario_bandtec;

    if (usuario == undefined) {
        window.location.href = 'login.html';
    } else {
        b_usuario.innerHTML = sessionStorage.usuario_bandtec;
    }
}




function logoff() {
    sessionStorage.removeItem('usuario_bandtec');
    verificarAutenticacao();
}

// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!
function atualizarGrafico() {
    obterDadosGrafico();
    setTimeout(atualizarGrafico, 10000);

}

// altere aqui as configurações do gráfico
// (tamanhos, cores, textos, etc)
function configurarGraficoTemp() {
    var configuracoes = {
        responsive: true,
        animation: exibiu_graficoTemp ? false : { duration: 1500 },
        hoverMode: 'index',
        stacked: false,
        title: {
            display: true,
            text: 'Histórico recente de temperatura'
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 40
                },
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'left',
                id: 'y-temperatura',
            }
            ],
        }
    };

    exibiu_graficoTemp = true;

    return configuracoes;
}

// altere aqui as configurações do gráfico
// (tamanhos, cores, textos, etc)
function configurarGraficoUmid() {
    var configuracoes = {
        responsive: true,
        animation: exibiu_graficoUmid ? false : { duration: 1500 },
        hoverMode: 'index',
        stacked: false,
        title: {
            display: true,
            text: 'Histórico recente de umidade'
        },
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 100
                },
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'left',
                id: 'y-umidade',
            }
            ],
        }
    };

    exibiu_graficoUmid = true;

    return configuracoes;
}

// altere aqui como os dados serão exibidos
// e como são recuperados do BackEnd
function obterDadosGrafico() {

    // neste JSON tem que ser 'labels', 'datasets' etc, 
    // porque é o padrão do Chart.js

    var dadosumid = {
        labels: [],
        layout: {
            padding: {
                left: 100,
                right: 100,
                top: 100,
                bottom: 100
            }
        },
        datasets: [
            {
                yAxisID: 'y-umidade',
                label: 'Umidade',
                borderColor: '#4B67C1',
                backgroundColor: '#4B67C1',
                fill: false,
                data: []
            }
        ]
    };

    var dadostemp = {
        labels: [],
        datasets: [
            {
                yAxisID: 'y-temperatura',
                label: 'Temperatura',
                borderColor: '#C44848',
                backgroundColor: '#C44848',
                fill: false,
                data: []
            }
        ]
    };

    fetch('/leituras/ultimas', { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                // atualizarUmidade(resposta.umid_atual)
                // dado_temp.innerHTML = `${resposta.temp_atual} °C`;
                // dado_umid.innerHTML = `${resposta.umid_atual} %`;
                // atualizarTemperatura(resposta.temp_atual)
                resposta.reverse();

                var temperatura_atual = 0;
                var umidade_atual = 0;
                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];

                    // aqui, após 'registro.' use os nomes 
                    // dos atributos que vem no JSON 
                    // que gerou na consulta ao banco de dados

                    dadostemp.labels.push(registro.momento);
                    dadostemp.datasets[0].data.push(registro.temperatura);
                    temperatura_atual = registro.temperatura;
                    umidade_atual = registro.umidade;
                    dadosumid.labels.push(registro.momento);
                    dadosumid.datasets[0].data.push(registro.umidade);
                }
                // console.log(resposta);
                atualizarUmidade(umidade_atual);
                atualizarTemperatura(temperatura_atual);
               
                mostrarAlertaTemp(temperatura_atual);
                mostrarAlertaUmid(umidade_atual);
                console.log(JSON.stringify(dadostemp, dadosumid));
                div_aguarde.style.display = 'none';
                div_aguarde1.style.display = 'none';
                obterDadosAnalyticsTemp()
                plotarGrafico(dadostemp, dadosumid);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}





function mostrarAlertaUmid(umidade) {
    if (umidade < 45 || umidade > 71) {
        div_alertUmid.style.display = 'block';
    } 
    else {
        div_alertUmid.style.display = 'none';
    }
}

function atualizarUmidade(umidade) {

    dado_umid.innerHTML = `${umidade} %`;
    if (umidade < 50 || umidade > 64) {
        $('#card_header_umidade').removeClass('bg-primary');
        $('#card_umidade').removeClass('bg-primary');
        $('#card_header_umidade').addClass('bg-warning');
        $('#card_umidade').addClass('bg-warning');
    } 
    else {
        $('#card_header_umidade').removeClass('bg-warning');
        $('#card_umidade').removeClass('bg-warning');
        $('#card_header_umidade').addClass('bg-primary');
        $('#card_umidade').addClass('bg-primary');
    }

}


function mostrarAlertaTemp(temperatura) {
    if (temperatura < 16 || temperatura > 28) {
        div_alertTemp.style.display = 'block';
    }
     else {
        div_alertTemp.style.display = 'none';
    }
}

function atualizarTemperatura(temperatura) {
    dado_temp.innerHTML = `${temperatura} °C`;
    if (temperatura < 18 || temperatura > 26) {
        $('#card_header_temperatura').removeClass('bg-danger');
        $('#card_temperatura').removeClass('bg-danger');
        $('#card_header_temperatura').addClass('bg-warning');
        $('#card_temperatura').addClass('bg-warning');
       
    } else {
        $('#card_header_temperatura').removeClass('bg-warning');
        $('#card_temperatura').removeClass('bg-warning');
        $('#card_header_temperatura').addClass('bg-danger');
        $('#card_temperatura').addClass('bg-danger');
        
    }



}

function obterDadosAnalyticsTemp() {
    fetch('leituras/estatisticas', { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (respostas) {
                console.log(`Analytics temperatura recebidos: ${JSON.stringify(respostas)}`);
                
                
                n_min.innerHTML = `Temperatura minima: ${respostas.temp_minima} °C`;
                n_priQ.innerHTML = `1º Quartil: ${respostas.temp_priQ} °C`;
                n_segQ.innerHTML = `2º Quartil: ${respostas.temp_segQ} °C`;
                n_terQ.innerHTML = `3º Quartil: ${respostas.temp_terQ} °C`;
                n_max.innerHTML = `Temperatura máxima: ${respostas.temp_maxima} °C`;

              
                u_min.innerHTML = `Umidade minima: ${respostas.umid_minima} %`;
                u_priQ.innerHTML = `1º Quartil: ${respostas.umid_priQ} %`;
                u_segQ.innerHTML = `2º Quartil: ${respostas.umid_segQ} %`;
                u_terQ.innerHTML = `3º Quartil: ${respostas.umid_terQ} %`;
                u_max.innerHTML = `Umidade máxima: ${respostas.umid_maxima} %`;

            })
        } else {
            console.error('Erro na obtenção de dados');

        }
    })
}


// só altere aqui se souber o que está fazendo!

function plotarGrafico(dados, dadosumid) {
    console.log('iniciando plotagem do gráfico...');

    var ctx = canvas_temp.getContext('2d');
    window.grafico_linha = Chart.Line(ctx, {
        data: dados,
        options: configurarGraficoTemp()
    });

    var ctx1 = canvas_umid.getContext('2d');
    window.grafico_linha = Chart.Line(ctx1, {
        data: dadosumid,
        options: configurarGraficoUmid()
    });
}