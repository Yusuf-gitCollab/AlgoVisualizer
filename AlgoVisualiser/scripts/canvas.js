import { drawLine, generateArray } from './utilities.js';
import { ref1, ref2, startX, maxValue, minValue, maxRects, unitWidth, rectGap } from './values/measurements.js';
import { bubbleSort } from './sorting-algorithms/bubbleSort.js';
import { insertionSort } from './sorting-algorithms/insetionSort.js';
import { selectionSort } from './sorting-algorithms/selectionSort.js'
import { mergeSortAnimationPromise } from './sorting-algorithms/mergeSort.js';

var canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight-39;
canvas.width = window.innerWidth;
console.log(canvas);

var ctx = canvas.getContext("2d");

drawLine(0, ref1, window.innerWidth, ref1);
drawLine(0, ref2, window.innerWidth, ref2);

generateArray();

bubbleSort();
// insertionSort();
// selectionSort();
// mergeSortAnimationPromise();
// countingSortArrayGenerate();

export {ctx};