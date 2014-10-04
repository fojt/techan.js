'use strict';

module.exports = function() {
  var indicatorMixin = require('./indicatormixin')(),
      accessor = require('../accessor')(),
	  sma = require('./sma')(indicatorMixin, accessor.ohlc),
      ema_init = require('./ema'),
      ema = ema_init(indicatorMixin, accessor.ohlc, ema_alpha_init);

  return {
    ema: ema,
    macd: require('./macd')(indicatorMixin, accessor.ohlc, ema),
    rsi: require('./rsi')(indicatorMixin, accessor.ohlc, ema),
	aroon: require('./aroon')(indicatorMixin, accessor.ohlc),
    stochastic: require('./stochastic')(indicatorMixin, accessor.ohlc, ema),
    williams: require('./williams')(indicatorMixin, accessor.ohlc, ema),
    adx: require('./adx')(indicatorMixin, accessor.ohlc, ema),
    bollinger: require('./bollinger')(indicatorMixin, accessor.ohlc, sma),
    sma: require('./sma')(indicatorMixin, accessor.ohlc),
    wilderma: ema_init(indicatorMixin, accessor.ohlc, wilder_alpha_init)
  };
};

function ema_alpha_init(period) {
  return 2/(period+1);
}

function wilder_alpha_init(period) {
  return 1/period;
}