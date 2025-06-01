// Firebase config
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getDatabase, 
                ref, 
                push, 
                onValue,
                remove } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
require('dotenv').config();

const firebaseConfig = {
    databaseURL : process.env.DATABASE_URL
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const referenceInDB = ref(database, "leads")

onValue(referenceInDB, function(snapshot) {
    if ( snapshot.exists() ) addLeadsToUL(Object.values(snapshot.val()));
})

// Variables initialization
const saveBtn = document.querySelector("#input-btn")
const inputEl = document.querySelector("#input-el")
const deleteBtn = document.querySelector("#delete-btn")
const ulEl = document.querySelector("#ul-el")

saveBtn.addEventListener("click", (event) => {
    event.preventDefault()
    let newLead = inputEl.value
    updateList(newLead)
    inputEl.value = ""
    return false
})

deleteBtn.addEventListener("dblclick", () => {
    ulEl.innerHTML = ""
    remove(referenceInDB)
})

function addLeadInUL(lead) {
    const newLead = document.createElement("li")
    const newLeadAnchor = document.createElement("a")
    newLead.appendChild(newLeadAnchor)
    newLeadAnchor.href = lead
    newLeadAnchor.textContent = lead
    newLeadAnchor.target = "_blank"
    ulEl.appendChild(newLead)
}

// If we found presaved leads then iterate them and add them to the ul
function addLeadsToUL(savedLeads) {
    ulEl.innerHTML = ""
    if (savedLeads) {
        for (const lead of savedLeads){
            addLeadInUL(lead)
        }
    }
}

function printSavedLeads(data) {
    for (const key in data){
        console.log(data[key])
    }
}

function updateList(lead) {
    push(referenceInDB, lead)
}
