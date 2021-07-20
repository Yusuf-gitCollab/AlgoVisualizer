// function resolveAfter25seconds() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             console.log("resolved");
//             resolve();
//         }, 2000);
//     })
// }

// async function asyncCall(index) {
//     console.log("calling...for the " + index + "th time");
//     await resolveAfter25seconds();
//     console.log("works fine")
// }

// asyncCall(0);

var obj1 = {
    name: "yusuf"
}

var obj2 = {
    name: "abcd",
}

let arr = [obj1, obj2]
console.log(arr[0]);
console.log("now gonna swap them");

var temp = arr[0];
arr[0] = arr[1];
arr[1] = temp;
console.log(arr[0]);
console.log(arr[1]);