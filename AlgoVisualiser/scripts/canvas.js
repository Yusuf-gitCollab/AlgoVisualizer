import { drawLine, generateRectangles } from './utilities.js';
import { ref1, ref2, startX, maxValue, minValue, maxRects, unitWidth, rectGap } from './values/measurements.js';
import Rectangle from './Rectangle.js';
import { bubbleSort } from './sorting-algorithms/bubbleSort.js';
import { insertionSort } from './sorting-algorithms/insetionSort.js';
import { selectionSort } from './sorting-algorithms/selectionSort.js'
import { mergeSortAnimationPromise } from './sorting-algorithms/mergeSort.js';
import { generate } from './sorting-algorithms/countingSort.js';

var bubbleSortBtn = document.getElementById("bubbleSortBtn");
var insertionSortBtn = document.getElementById("insertionSortBtn");
var selectionSortBtn = document.getElementById("selectionSortBtn");
var mergeSortBtn = document.getElementById("mergeSortBtn");
var playBtn = document.getElementById("playBtn");

var canvas = document.getElementById("myCanvas");
canvas.height = window.innerHeight-35;
canvas.width = (0.8 * window.innerWidth);
console.log(canvas);

var ctx = canvas.getContext("2d");

drawLine(0, ref1, window.innerWidth, ref1);
drawLine(0, ref2, window.innerWidth, ref2);

// onclick events
bubbleSortBtn.addEventListener("click", prepareCanvas);
insertionSortBtn.addEventListener("click", prepareCanvas);
selectionSortBtn.addEventListener("click", prepareCanvas);
mergeSortBtn.addEventListener("click", prepareCanvas);
playBtn.addEventListener("click", playAlgorithm);

var selectedAlorithm;

function prepareCanvas(e) {
    let icon = document.createElement("i");
    let iconClass = "fas fa-play";
    icon.className = iconClass;
    console.log(e.target);
    generateRectangles();
    selectedAlorithm = e.target.id;
}



function playAlgorithm() {
    console.log("play algorithm was called" + selectedAlorithm);
    switch (selectedAlorithm) {
        case "bubbleSortBtn":
            bubbleSort();
            break;
        case "insertionSortBtn":
            insertionSort();
            break;
    }
}





// generate();
// bubbleSort();
// insertionSort();
// selectionSort();
// mergeSortAnimationPromise(); 

export { ctx, canvas } ;