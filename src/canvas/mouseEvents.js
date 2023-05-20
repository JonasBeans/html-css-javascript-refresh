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