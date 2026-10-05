// 1. Select the DOM elements
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");

// 2. Listen for form submission
form.addEventListener("submit", function (e) {
  // Prevent the default form behavior (refreshing the page)
e.preventDefault();

  // Get and clean the input text
const itemText = input.value.trim();
if (itemText === "") return;

  // Create a new list item (li) element
const li = document.createElement("li");
li.textContent = itemText;

  // Create a delete button for the item
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.style.marginLeft = "10px";

  // Append the button into the list item, and the item into the list
  li.append(deleteBtn);
  list.append(li);

  // Clear the input box for the next item
  form.reset();
});

// 3. Listen for clicks on the list to delete items (Event Delegation)
list.addEventListener("click", function (e) {
  // Check if the user specifically clicked a delete button
  if (e.target.tagName === "BUTTON") {
    // e.target is the button; parentElement is the <li> containing it
    const liToRemove = e.target.parentElement;
    liToRemove.remove();
  }
});
