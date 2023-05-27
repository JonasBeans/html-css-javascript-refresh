let tickets = [];

window.onload = function(){ 
    getAllTickets().then(data => setTickets(data)); 
}

function setTickets(ticketFromResponse){
    tickets = ticketFromResponse;
    fillTable(); 
}

function createTicket(){
    let url = `http://${backendIP}/api/v1/ticket`;
    let formData = getTicketValuesFromForm();

    console.log(JSON.stringify(formData));

    fetch(url, {
        method:'POST',
        headers: {
           "Content-Type" : "application/json",
        }, 
        body: JSON.stringify(formData)
    })
    .then(response => data.json())
    .then(data => console.log(data))
    location.reload();
}

async function getAllTickets(){
    let url = `http://${backendIP}/api/v1/ticket/all`;

    return await fetch(url, {
        method: 'GET', 
    })
    .then(response => response.json())
}

function fillTable(){
    tickets.forEach(element => {
        console.log(element.id)
        let table = document.querySelector("table tbody");
        let fullTicket = createTicketForDOM(element);

        table.appendChild(fullTicket);
    });
}

function createTicketForDOM(ticket) {
    let fullTicket = document.createElement("tr");

    let ticketFields = makeTicketFields(ticket);

    fullTicket.appendChild(ticketFields.firstName);
    fullTicket.appendChild(ticketFields.lastName);
    fullTicket.appendChild(ticketFields.status);
    fullTicket.appendChild(ticketFields.description);

    return fullTicket;
}

function makeTicketFields(ticket) {
    let firstName = document.createElement("td");
    firstName.innerHTML = ticket.firstName;

    let lastName = document.createElement("td");
    lastName.innerHTML = ticket.firstName;

    let status = document.createElement("td");
    status.innerHTML = ticket.status;

    let description = document.createElement("td");
    description.innerHTML = ticket.description;

    return { firstName, lastName, status, description };
}

function getTicketValuesFromForm(){
    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let status = document.getElementById('status').value;
    let description = document.getElementById('description').value;

    return new Ticket(firstName, lastName, status, description);
}

class Ticket{

    constructor(firstName, lastName, status, description){
        this.firstName = firstName; 
        this.lastName = lastName; 
        this.status = status;
        this.description = description;
    }
}