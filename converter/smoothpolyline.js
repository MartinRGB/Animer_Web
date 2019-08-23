(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.smooth = factory());
}(this, (function () { 'use strict';

function copy(out, a) {
  out[0] = a[0];
  out[1] = a[1];
  return out;
}

var index = function (points) {
  var output = [];

  if (points.length > 0) {
    output.push(copy([0, 0], points[0]));
  }

  for (var i = 0; i < points.length - 1; i++) {
    var p0 = points[i];
    var p1 = points[i + 1];
    var p0x = (p0[0]);
    var p0y = (p0[1]);
    var p1x = (p1[0]);
    var p1y = (p1[1]);

    output.push([0.85 * p0x + 0.15 * p1x, 0.85 * p0y + 0.15 * p1y]);
    output.push([0.15 * p0x + 0.85 * p1x, 0.15 * p0y + 0.85 * p1y]);

  }

  if (points.length > 1) {
    output.push(copy([0, 0], points[points.length - 1]));
  }

  return output;
};

return index;

})));