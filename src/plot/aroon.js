'use strict';

module.exports = function(accessor_aroon, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function aroon(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);

      group.entry.append('path').attr('class', 'overbought');
      group.entry.append('path').attr('class', 'oversold');
      group.entry.append('path').attr('class', 'aroon up');
      group.entry.append('path').attr('class', 'aroon down');
      aroon.refresh(g);
    }

    aroon.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(aroon, p, accessor_aroon());

    return aroon;
  };
};

function refresh(g, accessor, x, y, plot) {
  g.selectAll('path.overbought').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.ob, y));
  g.selectAll('path.oversold').attr('d', plot.horizontalPathLine(accessor.d, x, accessor.os, y));
  g.selectAll('path.aroon.up').attr('d', plot.pathLine(accessor.d, x, accessor.up, y));
  g.selectAll('path.aroon.down').attr('d', plot.pathLine(accessor.d, x, accessor.down, y));
}