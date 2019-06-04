
var sms = require('../../Utils/apiSms')

var usuario;
var exibiu_graficoTemp = false;
var exibiu_graficoUmid = false;
verificarAutenticacao();

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
                dado_temp.innerHTML = `${resposta.temp_atual} °C`;
                dado_umid.innerHTML = `${resposta.umid_atual} %`;
                // atualizarTemperatura(resposta.temp_atual)
                resposta.reverse();

                var temperatura_atual = 0;
                var umidade_atual = 0;
                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];

                    // aqui, após 'registro.' use os nomes 
                    // dos atributos que vem no JSON 
                    // que gerou na consulta ao banco de dados

                    dadostemp.labels.push(registro.dataHora);
                    dadostemp.datasets[0].data.push(registro.temperatura);
                    temperatura_atual = registro.temperatura;
                    umidade_atual = registro.umidade;
                    dadosumid.labels.push(registro.dataHora);
                    dadosumid.datasets[0].data.push(registro.umidade);
                }
                // console.log(resposta);

                atualizarTemperatura(temperatura_atual);
                atualizarUmidade(umidade_atual);
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

function atualizarTemperatura(temperatura) {
    dado_temp.innerHTML = `${temperatura} °C`;
    if (temperatura < 20 || temperatura > 24) {
        // alert('Perigo baixa umidade!')
        // sms();
        $('#card_header_temperatura').addClass('text-light bg-warning');
        $('#card_temperatura').addClass('bg-warning');
        $('#card_header_temperatura').removeClass('border-warning');
        $('#icon_temp').addClass('text-light');
        $('#dado_temp').addClass('text-light');
    } else {

        $('#card_header_temperatura').removeClass('text-light bg-warning');
        $('#card_temperatura').removeClass('bg-warning');
        $('#card_header_temperatura').addClass('border-warning');
        $('#icon_temp').removeClass('text-light');
        $('#dado_temp').removeClass('text-light');
    }



}

function atualizarUmidade(umidade) {

    if (umidade < 40 || umidade > 80) {
        // alert('Perigo baixa umidade!')
        // sms();
        $('#card_header_umidade').addClass('text-light bg-warning');
        $('#card_umidade').addClass('bg-warning');
        $('#card_header_umidade').removeClass('border-warning');
        $('#icon_umid').addClass('text-light');
        $('#dado_umid').addClass('text-light');
    } else {

        $('#card_header_umidade').removeClass('text-light bg-warning');
        $('#card_umidade').removeClass('bg-warning');
        $('#card_header_umidade').addClass('border-warning');
        $('#icon_umid').removeClass('text-light');
        $('#dado_umid').removeClass('text-light');
    }
    dado_umid.innerHTML = `${umidade} %`;
}

function mostrarAlertaUmid(umidade) {
    if (umidade < 50 || umidade > 64) {
        div_alertUmid.style.display = 'block';
        sms();
    } else if (umidade < 45 || umidade > 71) {
        sms();
    }
    else {
        div_alertUmid.style.display = 'none';
    }
}
function mostrarAlertaTemp(temperatura) {
    if (temperatura < 18 || temperatura > 26) {
        div_alertTemp.style.display = 'block';
    } else if (temperatura > 28) {
        div_alertTemp.style.display = 'block';

    } else {
        div_alertTemp.style.display = 'none';
    }
}
function obterDadosAnalyticsTemp() {
    fetch('leituras/estatisticas', { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (respostas) {
                console.log(`Analytics temperatura recebidos: ${JSON.stringify(respostas)}`);
                n_med.innerHTML = `Temperatura média: ${respostas.temp_media} °C`;
                n_max.innerHTML = `Temperatura máxima: ${respostas.temp_maxima} °C`;
                n_min.innerHTML = `Temperatura minima: ${respostas.temp_minima} °C`;
                // 
                u_max.innerHTML = `Umidade máxima: ${respostas.umid_maxima} %`;
                u_min.innerHTML = `Umidade minima: ${respostas.umid_minima} %`;
                u_med.innerHTML = `Umidade média ${respostas.umid_media} %`;

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