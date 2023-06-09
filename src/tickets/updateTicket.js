window.onload = function() {initPage()}
let ticketToUpdate;

function initPage(){
    let ticketId = localStorage.getItem("ticketId");
    getTicketById(ticketId);
}

async function getTicketById(id){
    let url = `http://${backendIP}/api/v1/ticket/${id}`

    await fetch(url, {
        method: "GET"
    })
    .then(response => response.json())
    .then(ticket => fillForm(ticket))
}

function fillForm(ticketInfo){
    let ticketId = ticketInfo.id;
    let firstName = document.getElementById('first-name').value = ticketInfo.firstName;
    let lastName = document.getElementById('last-name').value = ticketInfo.lastName;
    let status = document.getElementById('status').value = ticketInfo.status;
    let description = document.getElementById('description').value = ticketInfo.description;

    ticketToUpdate = new Ticket(ticketId, firstName, lastName, status, description);
}

async function updateTicket(){
    let url = `http://${backendIP}/api/v1/ticket`;
    setTicketValuesFromForm();
    let hostIP = location.host;

    try{
        response = await fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ticketToUpdate)
    })
    } catch(e){
        alert(e.message)
    }
    if(response.ok){
        alert("Updated ticket succesfully");
        window.location.href = `http://${hostIP}/public/ticket.html`;
    } else {
        alert(reponse.json())
    }
}

function setTicketValuesFromForm(){
    ticketToUpdate.firstName = document.getElementById('first-name').value;
    ticketToUpdate.lastName = document.getElementById('last-name').value;
    ticketToUpdate.status = document.getElementById('status').value;
    ticketToUpdate.description = document.getElementById('description').value;
}

class Ticket{

    constructor(id, firstName, lastName, status, description){
        this.id = id;
        this.firstName = firstName; 
        this.lastName = lastName; 
        this.status = status;
        this.description = description;
    }
}