const state = {
    dishes: [],
    cart: [],
    search: ""
};

const menuEl = document.querySelector("#menu");
const cartListEl = document.querySelector("#cart-list");
const cartTotalEl = document.querySelector("#cart-total");
const searchEl = document.querySelector("#search");

const checkoutForm = document.querySelector("#checkout");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const areaInput = document.querySelector("#area");
const formError = document.querySelector("#form-error");
const orderConfirmation = document.querySelector("#order-confirmation");

const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;

async function loadMenu() {
    menuEl.textContent = "Loading menu...";
    try {
        const res = await fetch("data/menu.json");
        if (!res.ok) throw new Error("HTTP " + res.status);
        
        const data = await res.json();
        state.dishes = data.map(dish => ({
            ...dish,
            price: Number(dish.price) || 0
        }));
        
        loadCart();
        render();
    } catch (err) {
        console.error("Error loading menu:", err);
        menuEl.textContent = "Could not load the menu.";
    }
}

function render() {
    renderMenu();
    renderCart();
}

function renderMenu() {
    const term = state.search.toLowerCase().trim();
    const filteredDishes = state.dishes.filter(d => 
        d.name?.toLowerCase().includes(term) || 
        d.category?.toLowerCase().includes(term)
    );

    if (filteredDishes.length === 0) {
        menuEl.innerHTML = "<p>No dishes found.</p>";
        return;
    }

    menuEl.innerHTML = filteredDishes.map(d => `
        <article class="dish" data-id="${d.id}">
            <h3>${d.name}</h3>
            <p class="category">${d.category || ''} ${d.spicy ? "🌶️" : ""}</p>
            <p class="price">${d.price} ETB</p>
            <button class="add">Add</button>
        </article>
    `).join("");
}

function cartTotal() {
    return state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
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

    cartTotalEl.textContent = `Total: ${cartTotal()} ETB`;
}

function saveCart() {
    localStorage.setItem("addiseats_cart", JSON.stringify(state.cart));
}

function loadCart() {
    const saved = localStorage.getItem("addiseats_cart");
    if (saved) {
        try {
            state.cart = JSON.parse(saved);
        } catch (e) {
            console.error("Failed to parse cart JSON", e);
            state.cart = [];
        }
    }
}

menuEl.addEventListener("click", (e) => {
    if (!e.target.matches(".add")) return;

    const dishCard = e.target.closest(".dish");
    if (!dishCard) return;

    const id = Number(dishCard.dataset.id);
    const dish = state.dishes.find(d => d.id === id);
    if (!dish) return;

    const existingItem = state.cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.qty++;
    } else {
        state.cart.push({ ...dish, qty: 1 });
    }

    if (orderConfirmation) orderConfirmation.classList.add("hidden");

    saveCart();
    render();
});

cartListEl.addEventListener("click", (e) => {
    if (!e.target.matches(".rm")) return;

    const itemDiv = e.target.closest(".cart-item");
    if (!itemDiv) return;

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

function validate({ name, phone }) {
    if (!name.trim()) return "Please enter your name.";
    if (!PHONE_REGEX.test(phone.trim())) return "Enter a valid Ethiopian phone (e.g., 0912345678 or +251912345678).";
    if (state.cart.length === 0) return "Your cart is empty.";
    return "";
}

function placeOrder(data) {
    const order = {
        ...data,
        items: [...state.cart],
        total: cartTotal(),
        placedAt: new Date().toISOString()
    };

    console.log("Order placed successfully:", order);

    state.cart = [];
    saveCart();
    render();

    checkoutForm.reset();

    showConfirmation(order);
}

function showConfirmation(order) {
    if (!orderConfirmation) return;
    
    orderConfirmation.innerHTML = `
        <div class="confirmation-box">
            <h3>🎉 Order Placed!</h3>
            <p>Thank you, <strong>${order.name}</strong>.</p>
            <p>Your order total is <strong>${order.total} ETB</strong>.</p>
            <p>Delivery area: <strong>${order.area}</strong></p>
            <p>We will contact you via TeleBirr at <strong>${order.phone}</strong>.</p>
        </div>
    `;
    orderConfirmation.classList.remove("hidden");
}

if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const data = {
            name: nameInput.value,
            phone: phoneInput.value,
            area: areaInput.value
        };

        const errorMsg = validate(data);
        formError.textContent = errorMsg;

        if (errorMsg) return;

        placeOrder(data);
    });
}

loadMenu();