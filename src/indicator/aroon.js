'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, indicator_ema) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        period = 20,
        overbought = 70,
        middle = 50,
        oversold = 30;

    function indicator(data) {
      return data.map(function(d, i) {
        if(i >= period){
          var max = 0;
          var maxi = 0;
          var min = 10000;
          var mini = 0;
          for (var j = 0; j < period; j++) {
            if(data[i-j].high > max){
              max = data[i-j].high;
              maxi = j;
            }
            if(data[i-j].low < min){
              min = data[i-j].low;
              mini = j;
            }
          }
          var aroon = ((period-maxi)/period)*100;
          var aroonDown = ((period-mini)/period)*100;
          return datum(p.accessor.d(d), aroon,aroonDown, middle, overbought, oversold);
        }
        else return datum(p.accessor.d(d));
      }).filter(function(d) { return d.aroon; });
    }

    indicator.period = function(_) {
      if (!arguments.length) return period;
      period = _;
      return indicator;
    };

    indicator.overbought = function(_) {
      if (!arguments.length) return overbought;
      overbought = _;
      return indicator;
    };

    indicator.middle = function(_) {
      if (!arguments.length) return middle;
      middle = _;
      return indicator;
    };

    indicator.oversold = function(_) {
      if (!arguments.length) return oversold;
      oversold = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p, accessor_ohlc());

    return indicator;
  };
};

function datum(date, aroon,aroonDown, middle, overbought, oversold) {
  if(aroon) return { date: date, aroon: aroon,aroonDown:aroonDown, middle: middle, overbought: overbought, oversold: oversold };
  else return { date: date, aroon: null,aroonDown:null, middle: null, overbought: null, oversold: null };
}