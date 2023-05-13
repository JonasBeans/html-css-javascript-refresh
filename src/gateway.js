function messageHandler(data){
    let message = document.getElementById("formMessage");
    console.log(data);
    message.innerHTML = data;
}

async function getRandomQuote(){
    await fetch("http://localhost:8080/api/v1/fun-stuff/random-sentence",
        {
        method: 'GET', 
        mode: 'cors', 
    })
    .then((data) => data.text())
    .then((body) => messageHandler(body));
}

async function fetchIp(){
    await fetch("https://api.ipify.org", {
        method: 'GET'
    })
    .then((data) => data.text())
    .then((body) => document.getElementById("ipAdress").innerHTML = body)
}

async function getRandomNumberTestResult(){
    let amountOfIterations = document.getElementById("amountOfIterations").value;

    console.log(amountOfIterations);
    
    let url = "http://localhost:8080/api/v1/fun-stuff/random-numbers-test-result?amountOfIterations=" + amountOfIterations;
    console.log(url);
    await fetch(url, {
        method: 'GET'
    })
    .then((data) => data.json())
    .then((body) => {console.log(body); handleRandomNumberTestResult(body)})
}

function handleRandomNumberTestResult(body){
    document.getElementById("testResult").innerHTML = body;
}