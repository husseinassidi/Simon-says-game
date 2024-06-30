// colorArray.js

export function getRandomHexColor() {
    let randomNumber = Math.floor(Math.random() * 0xFFFFFF);
    let hexColor = '#' + randomNumber.toString(16).padStart(6, '0');
    return hexColor;
}

export function createUniqueRandomHexColor(existingColors) {
    let hexColor;
    do {
        hexColor = getRandomHexColor();
    } while (existingColors.has(hexColor));
    return hexColor;
}

export function create2DArray(rows, columns) {
    let array2D = [];
    let existingColors = new Set();

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            let uniqueColor = createUniqueRandomHexColor(existingColors);
            row.push(uniqueColor);
            existingColors.add(uniqueColor);
        }
        array2D.push(row);
    }
    return array2D;
}

export default function createColorDivs(colorArray) {
    const container = document.querySelector('div.container');

    // Clear the container to remove any existing content
    container.innerHTML = '';

    // Iterate over the 2D array
    colorArray.forEach(rowColors => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        rowColors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'btn';
            colorDiv.style.backgroundColor = color;

            // Optional: Generate a unique ID for each color div
            colorDiv.id = color; // Remove the '#' for ID

            // Optional: Add a class based on the color for styling (e.g., 'green', 'red')
            // You might want to implement a mapping from color to class here
            colorDiv.classList.add(color.slice(1)); // For example purposes only

            rowDiv.appendChild(colorDiv);
        });

        container.appendChild(rowDiv);
    });
}
