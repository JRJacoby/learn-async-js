function sumArray(arr) {
    return new Promise(resolve => {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        resolve(sum);
    });
}

async function sum2DArrayParallel(arr) {
    console.log('Sum called ... ');
    if (!Array.isArray(arr) || !arr.every(Array.isArray)) {
        console.log('rejecting ... ');
        throw new Error('BAD INPUT: Expected 2D array as input');
    }
    
    try {
        const sums = await Promise.all(arr.map(subArr => sumArray(subArr)));
        console.log('resolving ... ');
        const totalSum = sums.reduce((acc, curr) => acc + curr, 0);
        return totalSum;
    } finally {
        console.log('returning from sum');
    }
}

// Example usage:
const array2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

sum2DArrayParallel(array2D)
    .then(result => console.log('Total Sum:', result))
    .catch(error => console.error(error));