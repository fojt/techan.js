'use strict';

module.exports = function(accessor_stochastic, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function stochastic(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);

      group.entry.append('path').attr('class', 'overbought');
      group.entry.append('path').attr('class', 'oversold');
      group.entry.append('path').attr('class', 'stochastic up');
      group.entry.append('path').attr('class', 'stochastic down');
      stochastic.refresh(g);
    }

    stochastic.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(stochastic, p, accessor_stochastic());

    return stochastic;
  };
};

function refresh(g, accessor, x, y, plot) {
  g.selectAll('path.overbought').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.ob, y));
  g.selectAll('path.oversold').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.os, y));
  g.selectAll('path.stochastic.up').attr('d', plot.pathLine(accessor.d, x, accessor.k, y));
  g.selectAll('path.stochastic.down').attr('d', plot.pathLine(accessor.d, x, accessor.sd, y));
}