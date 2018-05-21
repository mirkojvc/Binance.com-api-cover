const request   = require('../libs/request');
const urls      = require('../libs/urls');

const makeTrade = (symbol, side, type, additional) => {
    let path = ``;
    path+= `symbol=${symbol}&side=${side}&type=${type}`;

    path += makePath(type, additional);

    request.sendRequestWithSignature(urls.order, path, "POST")
    .then((data) => {
        console.log(data);
    });
}

const makePath = (type, additional) => {
    let path = ``;

    if(["LIMIT", "STOP_LOSS_LIMIT", "TAKE_PROFIT_LIMIT"].indexOf(type) >= 0) {
        const timeInForce = additional.timeInForce;

        path+= `&timeInForce=${timeInForce}`;
    }

    path+= `&quantity=${additional.quantity}`;

    if(["LIMIT", "STOP_LOSS_LIMIT", "TAKE_PROFIT_LIMIT", "LIMIT_MAKER"].indexOf(type) >= 0) {
        const price = additional.price;

        path+= `&price=${price}`;
    }

    if(["STOP_LOSS", "STOP_LOSS_LIMIT", "TAKE_PROFIT_LIMIT"].indexOf(type) >= 0) {
        const stopPrice = additional.stopPrice;

        path+= `&stopPrice=${stopPrice}`;
    }

    if(additional.recvWindow) {
        path+= `&recvWindow=${additional.recvWindow}`;
    }

    return path;
}

module.exports = {makeTrade};
