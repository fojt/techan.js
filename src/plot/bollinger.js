'use strict';

module.exports = function(accessor_bollinger, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function bollinger(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);
      group.entry.append('path').attr('class', 'upper');
      group.entry.append('path').attr('class', 'middle');
      group.entry.append('path').attr('class', 'lower');
      bollinger.refresh(g);
    }

    bollinger.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(bollinger, p, accessor_bollinger());

    return bollinger;
  };
};

function refresh(g, accessor, x, y, plot) {
  g.selectAll('path.upper').attr('d', plot.pathLine(accessor.d, x, accessor.upper, y));
  g.selectAll('path.middle').attr('d', plot.pathLine(accessor.d, x, accessor.middle, y));
  g.selectAll('path.lower').attr('d', plot.pathLine(accessor.d, x, accessor.lower, y));
}