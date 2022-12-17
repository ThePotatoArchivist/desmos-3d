import fs from 'fs';

function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

let oldData: string;

function genOutput(): void {
    fs.readFile('./in.txt', 'utf8', (err: any, data: string): void => {
        if (data == oldData) {
            return;
        }
        oldData = data;

        let points = data
            .split('\n') // Split by lines
            .filter(e => e[0] != '#') // Remove commented
            .map(e => e.split(' ')) // Split by spaces
            .filter(e => e.length > 1); // Remove any lines with one item

        let colors = points.map(e => e.pop() ?? ''); // Extract colors
        let colorPalette = [...new Set(colors)]; // Unique colors
        let rgbColorPalette = colorPalette
            .map(hexToRgb)
            .map(e => e == null ? 'rgb\\left(0,0,0\\right)' : `rgb\\left(${e.r},${e.g},${e.b}\\right)`);
        let colorList = colors.map(e => `C_{s}\\left[${colorPalette.indexOf(e) + 1}\\right]`);

        let pointsList = points.flat(1);

        let pointIndices = points
            .map(e => e.length) // Convert to lengths
            .map((value, i, points) => points.slice(0, i + 1).reduce((prev, cur) => prev + cur))
        pointIndices.unshift(0);

        console.log('P_{s}=\\left[' + pointsList.join(',') + '\\right]');
        console.log('P_{is}=\\left[' + pointIndices.join(',') + '\\right]');
        console.log('C_{s}=\\left[' + rgbColorPalette.join(',') + '\\right]');
        console.log('C=\\left[' + colorList.join(',') + '\\right]');
        console.log(''); // Separate outputs with a space
    });
}

fs.watch('in.txt', genOutput);

genOutput();