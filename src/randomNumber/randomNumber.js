function showTestResult(){
    getRandomNumberTestResult()
    .then(data => handleRandomNumberTestResult(data))

}

function handleRandomNumberTestResult(testResults){
    let result = document.getElementById("testResult")
    result.innerHTML = ""
    testResults.forEach(element => {
        let node = document.createElement("li")
        node.innerText = element
        result.appendChild(node)
    });
}
