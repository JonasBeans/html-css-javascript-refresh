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
shapes.push({ x: 0, y: 0, width: 50, height: 50, color: 'red' });
shapes.push({ x: 50, y: 50, width: 100, height: 50, color: 'blue' });
shapes.push({ x: 200, y: 70, width: 100, height: 50, color: 'yellow' });
shapes.push({ x: 100, y: 200, width: 100, height: 50, color: 'purple' });

function getCordinatesInCanvas(clickX, clickY, canvas) {
    return { x: clickX - offsetX, y: clickY - offsetY };
}

function drawShapes() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    shapes.forEach(shape => {
        context.fillStyle = shape.color;
        context.strokeStyle = "black";
        context.fillRect(shape.x, shape.y, shape.width, shape.height);
        context.strokeRect(shape.x, shape.y, shape.width, shape.height)
    });
}

drawShapes()

function isInsideShape(cordinates, shape) {
    let shapeLeft = shape.x;
    let shapeRight = shape.x + shape.width;
    let shapeTop = shape.y;
    let shapeBottom = shape.y + shape.height;

    if (cordinates.x > shapeLeft && cordinates.x < shapeRight &&
        cordinates.y > shapeTop && cordinates.y < shapeBottom) {
        console.log("inside ")
        return true;
    }
    return false;
}

let mouseDown = function (event) {
    event.preventDefault();

    startCordinates = getCordinatesInCanvas(event.clientX, event.clientY, canvas);

    let index = 0;
    for (let shape of shapes) {
        if (isInsideShape(startCordinates, shape)) {
            currentShapeIndex = index;
            isDragging = true;
        }
        index++;
    }
}

let mouseUp = function (event) {
    event.preventDefault();
    if (!isDragging) {
        return;
    }
    isDragging = false;
}

let mouseOut = function (event) {
    event.preventDefault();
    if (!isDragging) {
        return;
    }
    isDragging = false;
}



let mouseMove = function (event) {
    if (!isDragging) {
        return
    } else {
        event.preventDefault();

        let moveCordinates = getCordinatesInCanvas(event.clientX, event.clientY, canvas);

        let dx = moveCordinates.x - startCordinates.x;
        let dy = moveCordinates.y - startCordinates.y;

        let currentShape = shapes[currentShapeIndex]; 

        currentShape.x += dx;
        currentShape.y += dy;

        drawShapes()

        startCordinates.x = moveCordinates.x
        startCordinates.y = moveCordinates.y
    }
}

canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmouseout = mouseOut;
canvas.onmousemove = mouseMove; 