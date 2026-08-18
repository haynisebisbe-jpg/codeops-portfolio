const state = {
    dishes: [],
    cart: [],
    search: ""
};

const menuEl = document.querySelector("#menu");
const cartListEl = document.querySelector("#cart-list");
const cartTotalEl = document.querySelector("#cart-total");
const searchEl = document.querySelector("#search");

async function loadMenu() {
    menuEl.textContent = "Loading menu...";
    try {
        const res = await fetch("data/menu.json");
        if (!res.ok) throw new Error("HTTP " + res.status);
        state.dishes = await res.json();
        loadCart();
        render();
    } catch (err) {
        menuEl.textContent = "Could not load the menu.";
    }
}

function render() {
    renderMenu();
    renderCart();
}

function renderMenu() {
    const term = state.search.toLowerCase();
    const filteredDishes = state.dishes.filter(d => 
        d.name.toLowerCase().includes(term) || 
        d.category.toLowerCase().includes(term)
    );

    if (filteredDishes.length === 0) {
        menuEl.innerHTML = "<p>No dishes found.</p>";
        return;
    }

    menuEl.innerHTML = filteredDishes.map(d => `
        <article class="dish" data-id="${d.id}">
            <h3>${d.name}</h3>
            <p class="category">${d.category} ${d.spicy ? "🌶️" : ""}</p>
            <p class="price">${d.price} ETB</p>
            <button class="add">Add</button>
        </article>
    `).join("");
}

function renderCart() {
    if (state.cart.length === 0) {
        cartListEl.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalEl.textContent = "Total: 0 ETB";
        return;
    }

    cartListEl.innerHTML = state.cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <p><strong>${item.name}</strong> x ${item.qty} — ${item.price * item.qty} ETB</p>
            <button class="rm">Remove</button>
        </div>
    `).join("");

    const total = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    cartTotalEl.textContent = `Total: ${total} ETB`;
}

function saveCart() {
    localStorage.setItem("addiseats_cart", JSON.stringify(state.cart));
}

function loadCart() {
    const saved = localStorage.getItem("addiseats_cart");
    if (saved) {
        state.cart = JSON.parse(saved);
    }
}

menuEl.addEventListener("click", (e) => {
    if (!e.target.matches(".add")) return;

    const dishCard = e.target.closest(".dish");
    const id = Number(dishCard.dataset.id);
    const dish = state.dishes.find(d => d.id === id);

    const existingItem = state.cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.qty++;
    } else {
        state.cart.push({ ...dish, qty: 1 });
    }

    saveCart();
    render();
});

cartListEl.addEventListener("click", (e) => {
    if (!e.target.matches(".rm")) return;

    const itemDiv = e.target.closest(".cart-item");
    const id = Number(itemDiv.dataset.id);

    state.cart = state.cart.filter(item => item.id !== id);

    saveCart();
    render();
});

if (searchEl) {
    searchEl.addEventListener("input", (e) => {
        state.search = e.target.value;
        renderMenu();
    });
}

loadMenu();