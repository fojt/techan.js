techanModule('indicator/aroon', function(specBuilder) {
    'use strict';

    var techan = require('../../../../src/techan'),
        data = require('./../_fixtures/data/aroon');

    var actualInit = function() {
        return techan.indicator.aroon;
    };

    specBuilder.require(require('../../../../src/indicator/aroon'), function(instanceBuilder) {
        instanceBuilder.instance('actual', actualInit, function(scope) {
            describe('And aroon is initialised with defaults', function () {
                var aroon;

                beforeEach(function () {
                    aroon = scope.aroon;
                });

                it('Then on default invoke, aroon should calculate correct values', function() {
                    aroon(data.input).forEach(function(d, i) {
                        expect(d).toEqual(data.expected[i]);
                    });
                });
            });
        });
    });
});