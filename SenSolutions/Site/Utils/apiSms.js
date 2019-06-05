const Nexmo = require('nexmo');

module.exports = function () {
    const nexmo = new Nexmo({
        apiKey: '4e932bbd',
        apiSecret: 'RX8CJZcof2NUj0uC'
      })
      
      const from = 'Nexmo'
      const to = '5511946359509'
      const text = 'ALERTA! Sua temperatura e umidade esta acima do recomendado'; 
      
      nexmo.message.sendSms(from, to, text)
             
}
