techanModule('accessor', function(specBuilder) {
  'use strict';

  var actualInit = function(module) {
    return module();
  };

  specBuilder.require(require('../../../../src/accessor'), function(instanceBuilder) {
    instanceBuilder.index('actual', actualInit, function(scope) {
      it('Then accessor.macd should be defined', function() {
        expect(scope.accessor.macd).toBeDefined();
      });

      it('Then accessor.ohlc should be defined', function() {
        expect(scope.accessor.ohlc).toBeDefined();
      });

      it('Then accessor.rsi should be defined', function() {
        expect(scope.accessor.rsi).toBeDefined();
      });

      it('Then accessor.aroon should be defined', function() {
        expect(scope.accessor.aroon).toBeDefined();
      });

      it('Then accessor.trendline should be defined', function() {
        expect(scope.accessor.trendline).toBeDefined();
      });

      it('Then accessor.value should be defined', function() {
        expect(scope.accessor.value).toBeDefined();
      });

      it('Then accessor.volume should be defined', function() {
        expect(scope.accessor.volume).toBeDefined();
      });
    });
  });
});