import fs from 'fs';

fs.readFile('./in.txt', 'utf8', (err: any, data: string): void => {
    let points = data
        .split('\n') // Split by lines
        .filter(e => e[0] != '#') // Remove commented
        .map(e => e.split(' ')) // Split by spaces
        .filter(e => e.length > 1); // Remove any lines with one item

    let pointsList = points.flat(1);

    let pointIndices = points
        .map(e => e.length) // Convert to lengths
        .map((value, i, points) => points.slice(0, i + 1).reduce((prev, cur) => prev + cur))
    pointIndices.unshift(0);

    console.log('P_{s}=\\left[' + pointsList.join(',') + '\\right]');
    console.log('P_{is}=\\left[' + pointIndices.join(',') + '\\right]');
});
