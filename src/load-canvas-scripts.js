const sourceFiles = [
    "../src/constants.js",
    "../src/canvas/canvas.js", 
    "../src/canvas/shapeManipulation.js", 
    "../src/canvas/mouseEvents.js", 
]

function initScriptFiles(){
    sourceFiles.forEach(element => {
        addSourceFileToDom(element);
    });

}

function addSourceFileToDom(element){
    let scriptNode = createScriptNode(element);
    let sourceFiles = document.getElementById("source-files");
    //sourceFiles.insertBefore(scriptNode, main);
    sourceFiles.appendChild(scriptNode)
}

function createScriptNode(fileName){
    let script = document.createElement("script");
    script.setAttribute("src", fileName)
    document.getElementById("source-files")
    console.log("Added: " + fileName);
    return script
}

initScriptFiles()