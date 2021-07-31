import { highlight, swapPromise } from '../animations.js';
import { defaultColor, dangerColor, safetyColor, pointingColor } from '../values/colors.js'
import { maxRects } from '../values/measurements.js';
import { generateRectangles, rectArray } from '../utilities.js'

var innerLoopResolve;
var timesRepeated = 0;

async function animateTheInnerLoop(index) {
    var lastIndex = (maxRects-1)-timesRepeated;

    await highlight(index, index+1, pointingColor, rectArray, 300);
    if(rectArray[index].value > rectArray[index+1].value){
        await highlight(index, index+1, dangerColor);
        await swapPromise(index, index+1);
        await highlight(index, index+1, safetyColor, 400);
    }else {
        await highlight(index, index+1, safetyColor, 400);
    }
    if ( index+1 == lastIndex) {
        
        await highlight(index+1, index+1, safetyColor, 50);
        if(lastIndex != 1) {
            highlight(index, index, defaultColor, 0);
        }else {
            hightlight(index, index, safetyColor, 0);
        }
        innerLoopResolve();
    }
    else {
        animateTheInnerLoop(index+1);
        await highlight(index, index+1, defaultColor, 400);
    }
    
}

function returnPromiseToAnimateInnerLoop() {
    return new Promise(resolve => {
        innerLoopResolve = () => {
            resolve();
        }
        animateTheInnerLoop(0);
    });
}

async function outerLoop() {
    await returnPromiseToAnimateInnerLoop();
    var temp = (maxRects-1)
    timesRepeated+=1;
    if(timesRepeated < temp) {
        outerLoop();
    }
}

function bubbleSort() {
    generateRectangles();
   outerLoop();
}

export { bubbleSort };
