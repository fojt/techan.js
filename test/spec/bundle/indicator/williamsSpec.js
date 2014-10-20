techanModule('indicator/williams', function(specBuilder) {
    'use strict';

    var techan = require('../../../../src/techan'),
        data = require('./../_fixtures/data/williams');

    var actualInit = function() {
        return techan.indicator.williams;
    };

    specBuilder.require(require('../../../../src/indicator/williams'), function(instanceBuilder) {
        instanceBuilder.instance('actual', actualInit, function(scope) {
            describe('And williams is initialised with defaults', function () {
                var williams;

                beforeEach(function () {
                    williams = scope.williams;
                });

                it('Then on default invoke, williams should calculate correct values', function() {
                    williams(data.input).forEach(function(d, i) {
                        expect(d).toEqual(data.expected[i]);
                    });
                });
            });
        });
    });
});