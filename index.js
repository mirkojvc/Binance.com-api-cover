const urls      = require('./libs/urls');
const trade     = require('./libs/trade');

const startUp = () => {
    trade.makeTrade(
        "RLCBTC",
        "SELL",
        "MARKET",
        {
            quantity: 7,
            recvWindow: 5000000
        }
    );
}




startUp();
