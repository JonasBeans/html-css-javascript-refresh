function handleErrorWithDOMFields(error, DOMField){
    let field = document.getElementById(DOMField)
    field.innerHTML = "Error: " + error.json();
}

function messageHandler(data){
    let message = document.getElementById("formMessage");
    console.log(data);
    message.innerHTML = data;
}

async function getRandomQuote(){
    await fetch(`http://${backendIP}/api/v1/fun-stuff/random-sentence`,
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
    let url = `http://${backendIP}/api/v1/fun-stuff/random-numbers-test-result?amountOfIterations=${amountOfIterations}`;

    return await fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
}