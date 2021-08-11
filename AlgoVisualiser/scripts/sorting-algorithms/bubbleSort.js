import { highlight, swapPromise } from '../animations.js';
import { defaultColor, dangerColor, safetyColor, pointingColor } from '../values/colors.js'
import { maxRects } from '../values/measurements.js';
import { generateRectangles, rectArray } from '../utilities.js'

var innerLoopResolve;
var timesRepeated = 0;

async function animateTheInnerLoop(index) {
    var lastIndex = (maxRects-1)-timesRepeated;
    if(index < lastIndex) {
        await highlight(index, index+1, pointingColor, 300);
        if(rectArray[index].value > rectArray[index+1].value){
            await swapPromise(index, index+1);
        }
        await highlight(index,index+1, defaultColor, 300);
        animateTheInnerLoop(index+1);
    }else {
        await highlight(index, index, safetyColor, 0);
        innerLoopResolve();
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
