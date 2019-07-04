const notifier = require('./src/note-notifier/index');
const stock = require('./src/stock')
const settings = require('./settings.json')

setInterval(() => {
  stock.startMonitoring()
}, settings.timer); 


