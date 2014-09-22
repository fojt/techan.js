'use strict';

module.exports = function() {
  var indicatorMixin = require('./indicatormixin')(),
      accessor = require('../accessor')(),
      sma = require('./sma')(indicatorMixin, accessor.ohlc),
      ema = require('./ema')(indicatorMixin, accessor.ohlc);

  return {
    ema: ema,
    macd: require('./macd')(indicatorMixin, accessor.ohlc, ema),
    rsi: require('./rsi')(indicatorMixin, accessor.ohlc, ema),
    aroon: require('./aroon')(indicatorMixin, accessor.ohlc, ema),
    stochastic: require('./stochastic')(indicatorMixin, accessor.ohlc, ema),
    williams: require('./williams')(indicatorMixin, accessor.ohlc, ema),
    bollinger: require('./bollinger')(indicatorMixin, accessor.ohlc, sma),
    sma: require('./sma')(indicatorMixin, accessor.ohlc)
  };
};