import { ctx } from "../canvas.js";
import { darkBlue, defaultColor, invisibleColor, pointingColor, safetyColor, textColor } from "../values/colors.js";
import { maxRects, rectGap, ref2, startX, unitWidth } from "../values/measurements.js";
import { highlight, invisibleRect, markSorted, redraw } from "../animations.js";
import { generateRectangles, rectArray } from "../utilities.js";
import Rectangle from "../Rectangle.js";

var minValue = 11;
var maxValue = minValue * 2;
var totalCountingRects = 12;
// console.log(totalCountingRects);
var x = startX;

var resolveTraversal;
var redrawPromiseResolver;

class CountingRect {
    
    constructor(posX, value) {
        this.posX = posX;
        this.height = value * 10;
        this.width = unitWidth
        this.posY = ref2-this.height;
        this.color = defaultColor;
        this.value = value;  
        this.occured = 0;      
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
        ctx.fillStyle = textColor;
        ctx.font = "16px Arial";
        ctx.fillText(this.value, this.posX, this.posY);
        ctx.fillText(this.occured, this.posX + this.width/2, this.posY + (this.height / 2));
       
    }

    changeOccurence(str) {
        if(str === '+' ) {
            this.occured += 1;
        }else if(str === '-') {
            this.occured -= 1;
        }
    }

    changeColor(color) {
        this.color = color;
        this.draw();
    }
    
}

var countingRectsArray = [];

function generateCountingRects() {
    var value = minValue;
    var x = startX;
    for(var i=0; i<totalCountingRects; i++) {
        countingRectsArray[i] = new CountingRect(x, value);
        countingRectsArray[i].draw();
        x += (unitWidth + rectGap);
        value+=1;
    }
}




async function drawSorted(index) {
    console.log("draw sorted called for index for " + index + " and x is " + x);
    var r = new Rectangle(x, countingRectsArray[index].value);
    r.changeColor(safetyColor);
    r.draw();
    countingRectsArray[index].changeOccurence('-');
    x += (unitWidth + rectGap);

    await highlight(index, index, invisibleColor, countingRectsArray, 200);
    if(countingRectsArray[index].occured > 0) {
        await highlight(index, index, darkBlue, countingRectsArray, 400);
        drawSorted(index);
    }else {
        await highlight(index, index, defaultColor, countingRectsArray, 400);
        redrawPromiseResolver();
    }
}

function redrawPromise(index) {
    return new Promise(resolve => {
        redrawPromiseResolver = () => {
            console.log("redraw function resolved for index " + index)
            resolve();
        }
        drawSorted(index);
    });
}

async function countingRectsArrayTraversal(index) {
    console.log("counting array traversal at index = " + index);
    if(countingRectsArray[index].occured > 0) {
        // var tempO = countingRectsArray[index].occured;
        await redrawPromise(index);
    }
    index += 1;
    if(index < totalCountingRects) {
        countingRectsArrayTraversal(index )
    }
}


async function traverse(index) {
    await highlight(index, index, pointingColor, rectArray, 300);
    await invisibleRect(index);
    let tempId = rectArray[index].value - minValue;
    countingRectsArray[tempId].changeOccurence('+');
    await highlight(tempId, tempId, invisibleColor, countingRectsArray, 0);
    await highlight(tempId, tempId, darkBlue, countingRectsArray, 200);
    console.log(tempId);
    if(index <= maxRects -1) {
        if(index === maxRects-1) {
            resolveTraversal();
        }else {
            traverse(index+1);
        }
        
    }
}

function traversePromise(index) {
    return new Promise(resolve => {
        resolveTraversal = () => {
            resolve();
            console.log("traversal resolved") 
            countingRectsArrayTraversal(0); 
        }
        traverse(index);
    })
}



async function play() {
    await traversePromise(0);

}

function generate() {
    generateCountingRects();
    generateRectangles(minValue, maxValue);
    console.log(rectArray);
    console.log(countingRectsArray)
    setTimeout(()=> {
        play();
    }, 1000);
}

export {generate}


// Functioning:
// generate() -> play() -> traversePromise(0) -> traverse() -> countingRectsArrayTraversal() -> redrawPromise() -> redraw() 