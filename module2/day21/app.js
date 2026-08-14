const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;
const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const errorArea = document.querySelector("#error-area");
const countDisplay = document.querySelector("#signup-count");

function getUsersFromStorage() {
try {
    const data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
} catch (err) {
    return [];
}
}

function updateCount() {
const users = getUsersFromStorage();
countDisplay.textContent = users.length;
}

function validateInput(name, phone) {
if (name.length < 2) {
    return "Please enter a valid full name (at least 2 characters).";
}
if (!PHONE_REGEX.test(phone)) {
    return "Please enter a valid Ethiopian phone number.";
}
return "";
}

form.addEventListener("submit", (e) => {
e.preventDefault();

const name = nameInput.value.trim();
const phone = phoneInput.value.trim();

const errorMessage = validateInput(name, phone);

if (errorMessage) {
    errorArea.textContent = errorMessage;
    return;
}

errorArea.textContent = "";

const users = getUsersFromStorage();
users.push({ name, phone });
localStorage.setItem("users", JSON.stringify(users));

form.reset();
updateCount();
});

document.addEventListener("DOMContentLoaded", () => {
updateCount();
});