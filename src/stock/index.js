const fs = require('fs')
const path = require('path');
const { lookup } = require('yahoo-stocks')
const notifier = require('../note-notifier/');
const dirFileStocks = `${__dirname}/data/stocks.json`

/**
 * Start monitoring stocks and show alerts in desktop
 */
module.exports.startMonitoring = async () => new Promise((resolve, reject) => {
    try {
        let rawData = fs.readFileSync(path.resolve(dirFileStocks))
        let json = JSON.parse(rawData).map(item => {
            lookup(item.symbol).then(res => {
                // console.log(res)
                notifier.notify(
                    {
                        title: 'Stock Notifications',
                        message: `Stock: ${res.symbol}\nCurrent Price: ${res.currentPrice}\n`,
                        wait: true,
                        sound: true
                    }
                );
            })
            
            return {
                _id: item._id,
                symbol: item.symbol,
            }
        })
        resolve('Promise executada com sucesso!')
    } catch (error) {
        reject(error)
    }
})

// async function updateStocks(json) {
//     console.log(json)
//     console.log(JSON.stringify(json))
//     fs.writeFile(dirFileStocks, json, err => {
//         if (err) throw err
//         console.log('The file has been save!')
//     })
// }
