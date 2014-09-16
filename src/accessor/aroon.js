'use strict';

module.exports = function() {
  var date = function(d) { return d.date; },
      aroon = function(d) { return d.aroon; },
      aroonDown = function(d) { return d.aroonDown; },
      overbought = function(d) { return d.overbought; },
      oversold = function(d) { return d.oversold; },
      middle = function(d) { return d.middle; };

  function accessor(d) {
    return accessor.r(d);
  }

  // TODO use d3.rebind to obtain this from 'super class'
  accessor.date = function(_) {
    if (!arguments.length) return date;
    date = _;
    return bind();
  };

  accessor.aroon = function(_) {
    if (!arguments.length) return aroon;
    aroon = _;
    return bind();
  };
  accessor.aroonDown = function(_) {
    if (!arguments.length) return aroonDown;
    aroonDown = _;
    return bind();
  };

  accessor.overbought = function(_) {
    if (!arguments.length) return overbought;
    overbought = _;
    return bind();
  };

  accessor.oversold = function(_) {
    if (!arguments.length) return oversold;
    oversold = _;
    return bind();
  };

  accessor.middle = function(_) {
    if (!arguments.length) return middle;
    middle = _;
    return bind();
  };

  function bind() {
    // TODO These methods will need to know if the variables are functions or values and execute as such
    accessor.d = date;
    accessor.aup = aroon;
    accessor.adown = aroonDown;
    accessor.ob = overbought;
    accessor.os = oversold;
    accessor.m = middle;

    return accessor;
  }

  return bind();
};