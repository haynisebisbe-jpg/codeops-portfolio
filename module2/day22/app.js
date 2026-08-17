const state = {
base: "ETB",
rates: {}, 
watchlist: [], 
amount: 100,
currency: "USD",
};
const API = "https://open.er-api.com/v6/latest/ETB";
const status = document.querySelector("#status");
async function loadRates() {
status.textContent = "Loading rates...";
try {
const res = await fetch(API);
if (!res.ok) throw new Error("HTTP " + res.status);
const data = await res.json();
state.rates = data.rates; 
status.textContent = "";
render();
} catch (err) {
status.textContent = "Could not load rates.";
}

}
const select = document.querySelector("#currency");
function render() {
const codes = Object.keys(state.rates);
select.innerHTML = codes
.map(c => `<option>${c}</option>`)
.join("");
select.value = state.currency;
renderWatchlist(); 
}
const form = document.querySelector("#convert-form");
const amount = document.querySelector("#amount");
const result = document.querySelector("#result");
form.addEventListener("submit", (e) => {
e.preventDefault();
const amt = Number(amount.value);
if (!amt || amt <= 0) {
result.textContent = "Enter a valid amount.";
return;
}

const c = select.value;
if (state.watchlist.includes(c)) return;
state.watchlist.push(c);
save(); 
renderWatchlist();

state.currency = select.value;
const rate = state.rates[state.currency];
const out = (amt * rate).toFixed(2);
result.textContent =
`${amt} ETB = ${out} ${state.currency}`;
});

const watchUl = document.querySelector("#watchlist");
function renderWatchlist() {
if (state.watchlist.length === 0) {
watchUl.innerHTML = "<li>No currencies yet</li>";
return;
}
watchUl.innerHTML = state.watchlist.map(c => {
const r = state.rates[c];
return `<li data-c="${c}">1 ETB = ${r} ${c}
<button class="rm">x</button></li>`;
}).join("");
}


watchUl.addEventListener("click", (e) => {
if (!e.target.matches(".rm")) return;
const c = e.target.closest("li").dataset.c;
state.watchlist =
state.watchlist.filter(x => x !== c);
save(); renderWatchlist();
});
const KEY = "birrwatch";
function save() {
localStorage.setItem(KEY, JSON.stringify({
watchlist: state.watchlist,
currency: state.currency,
}));
}
function load() {
const saved = localStorage.getItem(KEY);
if (saved) Object.assign(state, JSON.parse(saved));
}
async function init() {
load();
await loadRates(); 
render(); 
}
init();