'use strict';

module.exports = function(accessor_williams, plot, plotMixin) {  // Injected dependencies
  return function() { // Closure function
    var p = {};  // Container for private, direct access mixed in variables

    function williams(g) {
      var group = plot.groupSelect(g, plot.dataMapper.array, p.accessor.d);
      group.entry.append('path').attr('class', 'williams up');
      williams.refresh(g);
    }

    williams.refresh = function(g) {
      refresh(g, p.accessor, p.xScale, p.yScale, plot);
    };

    // Mixin 'superclass' methods and variables
    plotMixin(williams, p, accessor_williams());

    return williams;
  };
};

function refresh(g, accessor, x, y, plot) {
  g.selectAll('path.williams.up').attr('d', plot.pathLine(accessor.d, x, accessor.w, y));
}