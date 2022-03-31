// Selecting Components
const main = document.querySelector('main');
const form = document.querySelector('form.menu');
const canvas = document.querySelector('div.canvas');
const size = document.querySelector('#size');
const color = document.querySelector('#color');
const rainbowBtn = document.querySelector('#rainbow');
const pencilBtn = document.querySelector('#pencil');
const eraserBtn = document.querySelector('#eraser');
const resetBtn = document.querySelector('#reset');
let s = size.valueAsNumber || 16;
let height = main.clientHeight;
let width = main.clientWidth;
let minSize = Math.min(height, width);

form.addEventListener('submit', function(e) {
    e.preventDefault();
})

window.addEventListener('load', makeCanvas)
size.addEventListener('input', makeCanvas)
color.addEventListener('change', function(){
    pencilBtn.style.backgroundColor = color.value;      
})


function makeCanvas() {
    s = size.valueAsNumber || 16;

    canvas.setAttribute('style', `
        height:${minSize}px;
        width:${minSize}px;

        grid-template-columns: repeat(${s},1fr);
        grid-template-rows: repeat(${s},1fr);
    `)

    if (s > 16 || s <= 100) {
        while (canvas.firstChild) {
            canvas.removeChild(canvas.firstChild);
        }

        let runtime = s**2;
        for (let i =0; i < runtime; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            canvas.append(cell);
        }
    }
    else {
        alert(`Size should be between 16 to 100.`);
    }
}

function rainbowColor() {
    let red = Math.round(Math.random() * 255);
    let green = Math.round(Math.random() * 255);
    let blue = Math.round(Math.random() * 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

function pencil() {
    const cells = document.querySelectorAll('div.cell');
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', function(e) {
            e.target.style.backgroundColor = color.value;
        })
    })
}

function eraser() {
    const cells = document.querySelectorAll('div.cell');
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', function(e) {
            e.target.style.backgroundColor = 'rgba(255, 255, 255)';
        })
    })
}

function rainbow() {
    const cells = document.querySelectorAll('div.cell');
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', function(e) {
            e.target.style.backgroundColor = rainbowColor();
        })
    })
}

function resetEverything() {
    const cells = document.querySelectorAll('div.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = '#ffffff';
    })
    form.reset();
}

pencilBtn.addEventListener('click', pencil);
eraserBtn.addEventListener('click', eraser);
rainbowBtn.addEventListener('click', rainbow);
resetBtn.addEventListener('click', resetEverything);