var ref1 = 465;
var ref2 = ref1 * 2;

var unitHeight = 10; // smallest height of a unit rectangle
var unitWidth = 50;
var maxValue = 45;
var minValue = 1;

var rectGap = 40;
var startX = 15;
var maxRects = Math.floor((window.innerWidth - startX) / (rectGap + unitWidth));

export {ref1, ref2, unitHeight, unitWidth, rectGap, startX, maxValue, minValue, maxRects};