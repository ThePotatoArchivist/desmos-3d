function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

let oldData: string;
let oldOutput: string;

function genOutput(data: string): string {
    if (data == oldData) {
        return oldOutput;
    }
    oldData = data;

    let points = data
        .split('\n') // Split by lines
        .filter(e => e[0] != '#') // Remove commented
        .map(e => e.split(' ')) // Split by spaces
        .filter(e => e.length > 1); // Remove any lines with one item

    let opacities = points.map(e => e.pop() ?? ''); // Extract opacities

    let colors = points.map(e => e.pop() ?? ''); // Extract colors
    let colorPalette = [...new Set(colors)]; // Unique colors
    let rgbColorPalette = colorPalette
        .map(hexToRgb);
        // .map(e => e == null ? 'rgb\\left(0,0,0\\right)' : `rgb\\left(${e.r},${e.g},${e.b}\\right)`);
    let colorList = colors.map(e => colorPalette.indexOf(e) + 1);

    let pointsList = points.flat(1);

    let pointIndices = points
        .map(e => e.length) // Convert to lengths
        .map((value, i, points) => points.slice(0, i + 1).reduce((prev, cur) => prev + cur))
    pointIndices.unshift(0);

    let output = '';

    output += 'P_{s}=\\left[' + pointsList.join(',') + '\\right]';
    output += 'P_{is}=\\left[' + pointIndices.join(',') + '\\right]';
    output += `C_{r}=\\left[${rgbColorPalette.map(e => e?.r ?? 0).join(',')}\\right]`;
    output += `C_{g}=\\left[${rgbColorPalette.map(e => e?.g ?? 0).join(',')}\\right]`;
    output += `C_{b}=\\left[${rgbColorPalette.map(e => e?.b ?? 0).join(',')}\\right]`;
    output += 'C=\\left[' + colorList.join(',') + '\\right]';
    output += 'O_{p}=\\left[' + opacities.join(',') + '\\right]';
    output += ''; // Separate outputs with a space

    oldOutput = output;
    return output;
}

interface ProcessorFormElements extends HTMLFormControlsCollection {
    input: HTMLTextAreaElement;
    output: HTMLTextAreaElement;
}

document.getElementById('form')!.addEventListener('submit', (event) => {
    const controlElements = <ProcessorFormElements>(<HTMLFormElement>event.target).elements;
    controlElements.output.value = genOutput(controlElements.input.value);
    event.preventDefault();
});

document.getElementById('output')!.addEventListener('focus', (event) => {
    (<HTMLTextAreaElement>event.target).select();
})
