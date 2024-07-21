//Variables
const form = document.querySelector("#form");
const nameInput = document.querySelector("#name");
const lastNameInput = document.querySelector("#last-name");
const emailInput = document.querySelector("#email");
const enquiryInput = document.querySelector("#enquiry");
const supportInput = document.querySelector("#support");
const messageInput = document.querySelector("#message");
const termsInput = document.querySelector("#terms");

//Event listenners
form.addEventListener("submit", sendData);

nameInput.addEventListener("blur", validateInput);
lastNameInput.addEventListener("blur", validateInput);
emailInput.addEventListener("blur", validateInput);
enquiryInput.addEventListener("change", validateInputRadio);
supportInput.addEventListener("change", validateInputRadio);
messageInput.addEventListener("blur", validateInput);

termsInput.addEventListener("change", validateInputChecked);

//Funtion
function validateInput(e) {
    if(e.target.value.trim() === "") {
        showAlert(`El campo ${e.target.name} es obligatorio`, e.target.parentElement);
        return;
    }

    cleanHTML(e.target.parentElement);
}

function validateInputChecked(e) {
    if(!e.target.checked) {
        showAlert(`El campo ${e.target.name} es obligatorio`, e.target.parentElement);
        return;
    }

    cleanHTML(e.target.parentElement);
}

let selectedRadio;
function validateInputRadio(e) {
    selectedRadio = e.target.value;
}

function sendData(e) {
    e.preventDefault();

    const person = {
        namePerson: nameInput.value,
        lastNamePerson: lastNameInput.value,
        emailPerson: emailInput.value,
        contactType: selectedRadio, 
        termsAccepted: termsInput.checked,
        message: messageInput.value
    }

    if(Object.values(person).includes("") || !termsInput.checked) {
        showAlert("Los campos no pueden estar vacíos", e.target.parentElement);
        return;
    }

    console.log(person);
}

function showAlert(msg, reference) {
    const messageAlert = document.createElement("P");
    messageAlert.textContent = msg;
    messageAlert.classList.add("message-alert");

    reference.appendChild(messageAlert);

    setTimeout(() => {
        messageAlert.remove();
    }, 3000);
}

function cleanHTML(reference) {
    const alert = reference.querySelector(".message-alert");
    if(alert) {
        alert.remove();
    }
}