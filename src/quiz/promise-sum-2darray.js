function sumArray(arr) {
    return new Promise(resolve => {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        resolve(sum);
    });
}

function sum2DArrayParallel(arr) {
    return new Promise((resolve, reject) => {
        console.log('Sum called ... ');
        if (Array.isArray(arr) && arr.every(Array.isArray)) {
            const promises = arr.map(subArr => sumArray(subArr));
            Promise.all(promises)
                .then(sums => {
                    console.log('resolving ... ');
                    const totalSum = sums.reduce((acc, curr) => acc + curr, 0);
                    resolve(totalSum);
                });
        } else {
            console.log('rejecting ... ');
            reject('BAD INPUT: Expected 2D array as input');
        }
        console.log('returning from sum');
    });
}

// Example usage:
const array2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const sumPromise1 = sum2DArrayParallel(array2D);
sumPromise1
    .then((res) => console.log(res)) // Expected output: 45
    .catch((err) => console.log(err));

const sumPromise2 = sum2DArrayParallel('array2D');
sumPromise2
    .then((res) => console.log(res))
    .catch((err) => console.log(err)); // Expected output: "BAD INPUT: Expected 2D array as input"
