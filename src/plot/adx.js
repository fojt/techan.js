'use strict';

module.exports = function(accessor_adx, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function adx(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);

      group.entry.append('path').attr('class', 'adx');
      group.entry.append('path').attr('class', 'plusDi');
      group.entry.append('path').attr('class', 'minusDi');

      adx.refresh(g);
    }

    adx.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(adx, p, accessor_adx());

    return adx;
  };
};

function refresh(g, accessor, x, y, plot) {
  g.selectAll('path.adx').attr('d', plot.pathLine(accessor.d, x, accessor.adx, y));
  g.selectAll('path.plusDi').attr('d', plot.pathLine(accessor.d, x, accessor.plusDi, y));
  g.selectAll('path.minusDi').attr('d', plot.pathLine(accessor.d, x, accessor.minusDi, y));
}