let tickets = [];

window.onload = function(){ 
    getAllTickets().then(data => setTickets(data)); 
}

function setTickets(ticketFromResponse){
    tickets = ticketFromResponse;
    fillTable(); 
}

async function createTicket(){
    let url = `http://${backendIP}/api/v1/ticket`;
    let formData = getTicketValuesFromForm();
    let form = document.querySelector("form")

    console.log(JSON.stringify(formData));

    await fetch(url, {
        method:'POST',
        headers: {
           "Content-Type" : "application/json",
        }, 
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(() => location.reload())
    .then(() => form.reset())
}

async function getAllTickets(){
    let url = `http://${backendIP}/api/v1/ticket/all`;

    return await fetch(url, {
        method: 'GET', 
    })
    .then(response => response.json())
}

function fillTable(){
    let table = document.querySelector("table tbody");
    tickets.forEach(ticket => {
        console.log(ticket.id)
        let fullTicket = createTicketForDOM(ticket);
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
    fullTicket.appendChild(ticketFields.deleteButton);
    fullTicket.appendChild(ticketFields.updateButton);

    return fullTicket;
}

function makeTicketFields(ticket) {
    let firstName = document.createElement("td");
    firstName.innerHTML = ticket.firstName;

    let lastName = document.createElement("td");
    lastName.innerHTML = ticket.lastName;

    let status = document.createElement("td");
    status.innerHTML = ticket.status;

    let description = document.createElement("td");
    description.innerHTML = ticket.description;
    
    let deleteButton = createDeleteButton(ticket.id);

    let updateButton = createUpdateButton(ticket.id);

    return { firstName, lastName, status, description, deleteButton, updateButton };
}

function createDeleteButton(id){
    let tableCel = document.createElement("td");
    let getButton = document.createElement("input");

    getButton.type = "button";
    getButton.value = "delete"
    getButton.addEventListener("click", deleteTicketById.bind(null,id))

    tableCel.appendChild(getButton);
    return tableCel
}
function createUpdateButton(id){
    let tableCel = document.createElement("td");
    let getButton = document.createElement("input");

    getButton.type = "button";
    getButton.value = "update"
    getButton.addEventListener("click", updateTicketById.bind(null,id))

    tableCel.appendChild(getButton);
    return tableCel
}

function updateTicketById(id){
    localStorage.setItem("ticketId", id);
    let hostIP = location.host;
    window.location.href = `http://${hostIP}/public/updateTicket.html`;
}

async function deleteTicketById(id){
    let url = `http://${backendIP}/api/v1/ticket/${id}`

    await fetch(url, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(() => location.reload())
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