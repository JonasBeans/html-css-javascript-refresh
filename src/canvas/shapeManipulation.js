function addShape(){
    let shapeText = document.getElementById("shapeText").value;
    let shapeColor = document.getElementById("shapeColor").value;
    let shape = {text: shapeText, color: shapeColor};
    if(validateNewShape(shape))
        shapes.push({ x: 0, y: 0, width: shape.text.length * 8, height: 50, color: shape.color, text: shape.text });
    drawShapes();
}
function validateNewShape(shape){
    let validationText = document.getElementById("shapeValidation"); 
    if(shape.text === null || shape.text === ""){
        validationText.innerHTML = "Shape text cannot be empty"
        return false;
    }

    validationText.innerHTML = null;
    return true;
}

function clearShapes(){
    shapes = []
    drawShapes();
}

