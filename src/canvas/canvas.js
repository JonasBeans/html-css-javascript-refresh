let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let canvasHeight = window.innerHeight;
let canvasWidth = window.innerWidth;

let offsetX;
let offsetY;

function getOffset(){
    let canvasOffsets = canvas.getBoundingClientRect(); 
    offsetX = canvasOffsets.left;
    offsetY = canvasOffsets.top;
}

getOffset();
window.onresize = function() { getOffset(); }
window.onscroll = function() { getOffset(); }
canvas.onresize = function() { getOffset(); }

canvas.width = canvasWidth;
canvas.height = canvasHeight;
canvas.style.border = '2px solid brown';

let isDragging = false;
let startCordinates;
let currentShapeIndex = null;

let shapes = [];

function getCordinatesInCanvas(clickX, clickY, canvas) {
    return { x: clickX - offsetX, y: clickY - offsetY };
}

function drawShapes() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    shapes.forEach(shape => {
        context.fillStyle = shape.color;
        context.strokeStyle = "black";

        context.fillRect(shape.x, shape.y, shape.width, shape.height);
        context.strokeRect(shape.x, shape.y, shape.width, shape.height);

        context.fillStyle = "black";
        console.log(shape)
        context.fillText(shape.text, shape.x + (shape.width / 2) - (shape.text.length / 2 * 5.5), shape.y + shape.height / 2);
    });
}

drawShapes()