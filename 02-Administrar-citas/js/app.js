const patientInput = document.querySelector("#patient");
const ownerInput = document.querySelector("#owner");
const emailInput = document.querySelector("#email");
const dateInput = document.querySelector("#date");
const symptomsInput = document.querySelector("#symptoms");

const form = document.querySelector("#form-appointment");
const formlarioInput = document.querySelector("#form-appointment input[type='submit']");
const containerAppointment = document.querySelector("#appointment");

patientInput.addEventListener("blur", validateInput);
ownerInput.addEventListener("blur", validateInput);
emailInput.addEventListener("blur", validateInput);
dateInput.addEventListener("blur", validateInput);
symptomsInput.addEventListener("blur", validateInput);

form.addEventListener("submit", sendForm);

let editingUser = false;

const objectUser = {
  id: Math.random().toString(32) + Date.now(),
  patient: "",
  owner: "",
  email: "",
  date: "",
  symptoms: ""
}

class Admin {
  constructor() {
    this.appointments = [];
  }

  addUser(user) {
    this.appointments = [...this.appointments, user];

    this.readUsers();
  }

  readUsers() {
    cleanHTML();

    this.appointments.forEach((appointment) => {
      const divappointment = document.createElement("div");
      divappointment.classList.add(
        "mx-5",
        "my-10",
        "bg-white",
        "shadow-md",
        "px-5",
        "py-10",
        "rounded-xl",
        "p-3"
      );

      const patient = document.createElement("p");
      patient.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case"
      );
      patient.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${appointment.patient}`;

      const owner = document.createElement("p");
      owner.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case"
      );
      owner.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${appointment.owner}`;

      const email = document.createElement("p");
      email.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case"
      );
      email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${appointment.email}`;

      const date = document.createElement("p");
      date.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case"
      );
      date.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${appointment.date}`;

      const symptoms = document.createElement("p");
      symptoms.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case"
      );
      symptoms.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${appointment.symptoms}`;

      const btnEdit = document.createElement("button");
      btnEdit.classList.add(
        "py-2",
        "px-10",
        "bg-indigo-600",
        "hover:bg-indigo-700",
        "text-white",
        "font-bold",
        "uppercase",
        "rounded-lg",
        "flex",
        "items-center",
        "gap-2",
        "btn-editar"
      );
      btnEdit.innerHTML =
        'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
        btnEdit.onclick = () => loadEdition(appointment);

      const btnDelete = document.createElement("button");
      btnDelete.classList.add(
        "py-2",
        "px-10",
        "bg-red-600",
        "hover:bg-red-700",
        "text-white",
        "font-bold",
        "uppercase",
        "rounded-lg",
        "flex",
        "items-center",
        "gap-2"
      );
      btnDelete.innerHTML =
        'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        btnDelete.onclick = () => this.deleteUser(appointment);

      const btnContainer = document.createElement("DIV");
      btnContainer.classList.add("flex", "justify-between", "mt-10");

      btnContainer.appendChild(btnEdit);
      btnContainer.appendChild(btnDelete);

      divappointment.appendChild(patient);
      divappointment.appendChild(owner);
      divappointment.appendChild(email);
      divappointment.appendChild(date);
      divappointment.appendChild(symptoms);
      divappointment.appendChild(btnContainer);
      containerAppointment.appendChild(divappointment);
    })
  }

  editUser(appointmentUser) {
    this.appointments = this.appointments.map(appointment => appointment.id === appointmentUser.id ? appointmentUser : appointment);

    this.readUsers();
  }

  deleteUser(appointmentUser) {
    this.appointments = this.appointments.filter(appointment => appointment.id !== appointmentUser.id);

    this.readUsers();
  }
}

const admin = new Admin();

class AlertInput {
  constructor({text, reference}) {
    this.text = text;
    this.reference = reference;
  }

  show() {
    const div = document.createElement("DIV");
    const paragraphAlert = document.createElement("P");

    div.classList.add("bg-red-500", "p-2", "mt-2", "text-white");

    paragraphAlert.textContent = this.text;

    div.appendChild(paragraphAlert);
    this.reference.appendChild(div);

    setTimeout(() => {
      div.remove();
    }, 3000)
  }

  showMessageGeneral() {
    const divGeneral = document.createElement("DIV");
    const paragraphGeneral = document.createElement("P");

    divGeneral.classList.add("bg-red-500", "p-2", "mt-2", "text-white");

    paragraphGeneral.textContent = this.text;

    divGeneral.appendChild(paragraphGeneral);
    this.reference.appendChild(divGeneral);

    setTimeout(() => {
      divGeneral.remove();
    }, 3000)
  }
}

function validateInput(e) {
  if(e.target.value === "") {

    const alert = new AlertInput({
      text: `El campo ${e.target.id} es obligatorio`,
      reference: e.target.parentElement
    });

    alert.show();
    return;
  }

  objectUser[e.target.name] = e.target.value;
}

function sendForm(e) {
  e.preventDefault();

  if(Object.values(objectUser).some((value) => value.trim() === "")) {
    const alert = new AlertInput({
      text: "Todos los campos están vacíos",
      reference: document.querySelector("#form-appointment")
    })

    alert.showMessageGeneral();

    return;
  }

  if(editingUser) {
    admin.editUser({...objectUser});
  }else {
    admin.addUser({...objectUser});
  }

  restarObjectUser();
  form.reset();
  editingUser = false;
  formlarioInput.value = "Registrar Paciente";
}

function cleanHTML() {
  while(containerAppointment.firstChild) {
    containerAppointment.removeChild(containerAppointment.firstChild);
  }
}

function restarObjectUser() {
  Object.assign(objectUser, {
  id: Math.random().toString(32) + Date.now(),
  patient: "",
  owner: "",
  email: "",
  date: "",
  symptoms: ""
  })
}

function loadEdition(appointment) {
  Object.assign(objectUser, appointment);

  patientInput.value = appointment.patient;
  ownerInput.value = appointment.owner;
  emailInput.value = appointment.email;
  dateInput.value = appointment.date;
  symptomsInput.value = appointment.symptoms;

  formlarioInput.value = "Editar Paciente";
  editingUser = true;
}