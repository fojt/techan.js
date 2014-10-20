techanModule('indicator/bollinger', function(specBuilder) {
    'use strict';

    var techan = require('../../../../src/techan'),
        data = require('./../_fixtures/data/bollinger');

    var actualInit = function() {
        return techan.indicator.bollinger;
    };

    specBuilder.require(require('../../../../src/indicator/bollinger'), function(instanceBuilder) {
        instanceBuilder.instance('actual', actualInit, function(scope) {
            describe('And bollinger is initialised with defaults', function () {
                var bollinger;

                beforeEach(function () {
                    bollinger = scope.bollinger;
                });

                it('Then on default invoke, bollinger should calculate correct values', function() {
                    bollinger(data.input).forEach(function(d, i) {
                        expect(d).toEqual(data.expected[i]);
                    });
                });
            });
        });
    });
});