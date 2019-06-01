

const Nexmo = require('nexmo');

module.exports = function () {

        
        const nexmo = new Nexmo({
            apiKey: '8f10e405',
            apiSecret: 'QD4LdVEirXg1eDCk'
        })

        const from = 'Nexmo'
        const to = '5511964453368'
        const text = 'ALERTA! Sua temperatura e umidade esta acima do recomendado';

        nexmo.message.sendSms(from, to, text);
    }