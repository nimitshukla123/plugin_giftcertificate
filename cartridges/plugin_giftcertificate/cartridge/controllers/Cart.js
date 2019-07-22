'use strict';

var server = require('server');
var cart = module.superModule;

server.extend(cart);

server.append('MiniCart', function (req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');

    var currentBasket = BasketMgr.getCurrentBasket();
    var quantityTotal;

    if (currentBasket) {
        quantityTotal = currentBasket.productQuantityTotal;
    } else {
        quantityTotal = 0;
    }

    if (currentBasket.giftCertificateLineItems.size() > 0) {
        quantityTotal += currentBasket.giftCertificateLineItems.size();
    }

    res.setViewData({
        quantityTotal: quantityTotal
    })
    next();
});

module.exports = server.exports();
