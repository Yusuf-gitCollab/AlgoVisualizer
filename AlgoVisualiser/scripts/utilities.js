import { ctx } from './canvas.js';
import Rectangle from './Rectangle.js';
import { ref1, ref2, startX, maxValue, minValue, maxRects, unitWidth, rectGap } from './values/measurements.js';

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

let rectArray = [];
var x = startX;

function generateArray() {
    for(var i=0; i< maxRects; i++) {
        var value = Math.floor((Math.random() * maxValue) + minValue);
        rectArray[i] = new Rectangle(x, value, ref1);
        rectArray[i].draw();
        x += (unitWidth + rectGap);
    }
}

export { drawLine, rectArray, generateArray };