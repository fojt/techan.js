'use strict';

module.exports = function(indicatorMixin, accessor_ohlc, indicator_ema) {  // Injected dependencies
  return function() { // Closure function
    var p = {},  // Container for private, direct access mixed in variables
        period = 20,
        sdMultiplication = 2;
    var sd;

    function indicator(data) {
        var signalLine = indicator_ema().accessor(indicator.accessor()).period(period).init();

        var j;
      return data.map(function(d, i) {

        if(i >= period) {
            var middleBand = signalLine.average(p.accessor(d));
//            var mid;
//            mid = 0;
//            for(j = 0;j<period;j++){
//                mid += data[i-j].close ;
//            }
//            middleBand = mid/period;

            var sum = 0;
            for(j = 0;j<period;j++){
                sum += (Math.pow(   (data[i-j].close - middleBand)  ,2 ) );
            }

            sd = Math.sqrt( sum/period );

            var upperBand = middleBand+sdMultiplication*sd,
                lowerBand = middleBand-sdMultiplication*sd;

            return datum(p.accessor.d(d), middleBand, upperBand, lowerBand);
        }
        else return datum(p.accessor.d(d));

      }).filter(function(d) { return d.middleBand; });
    }



    indicator.period = function(_) {
      if (!arguments.length) return period;
      period = _;
      return indicator;
    };

    indicator.sdMultiplication = function(_) {
      if (!arguments.length) return sdMultiplication;
        sdMultiplication = _;
      return indicator;
    };

    // Mixin 'superclass' methods and variables
    indicatorMixin(indicator, p, accessor_ohlc());

    return indicator;
  };
};

function datum(date, middleBand, upperBand, lowerBand) {

  if(middleBand) return { date: date, middleBand: middleBand, upperBand: upperBand, lowerBand: lowerBand};
  else return { date: date, middleBand: null, upperBand: null, lowerBand: null};
}