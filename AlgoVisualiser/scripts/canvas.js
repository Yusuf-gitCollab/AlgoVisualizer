import { drawLine } from './utilities.js';
import { ref1, ref2, startX, maxValue, minValue, maxRects, unitWidth, rectGap } from './values/measurements.js';
import Rectangle from './Rectangle.js';
import { bubbleSort } from './sorting-algorithms/bubbleSort.js';
import { insertionSort } from './sorting-algorithms/insetionSort.js';
import { selectionSort } from './sorting-algorithms/selectionSort.js'
import { mergeSortAnimationPromise } from './sorting-algorithms/mergeSort.js';
import { generate } from './sorting-algorithms/countingSort.js';

var canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight-39;
canvas.width = window.innerWidth;
console.log(canvas);

var ctx = canvas.getContext("2d");

drawLine(0, ref1, window.innerWidth, ref1);
drawLine(0, ref2, window.innerWidth, ref2);



// for(var i=0; i<maxRects; i++) {
//     var value = Math.floor((Math.random() * maxValue) + minValue);
//     rectArray[i] = new Rectangle(x, value);
//     rectArray[i].draw();
//     x += (unitWidth + rectGap);
// }
generate();
// bubbleSort();
// insertionSort();
// selectionSort();
// mergeSortAnimationPromise(); 

export { ctx } ;