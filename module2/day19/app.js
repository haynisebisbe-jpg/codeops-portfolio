let items = [];

const form = document.getElementById('add-form');
const input = document.getElementById('name');
const list = document.getElementById('list');
const count = document.getElementById('count');

function render() {
  list.innerHTML = '';

  items.forEach((item) => {
    const li = document.createElement('li');
    li.dataset.id = item.id;

    if (item.done) {
      li.classList.add('done');
    }

    li.innerHTML = `
      <span>${item.name}</span>
      <button class="del">×</button>
    `;

    list.appendChild(li);
  });

  count.textContent = `${items.length} items`;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  items.push({
    id: Date.now().toString(),
    name: text,
    done: false
  });

  input.value = '';
  render();
});

list.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;

  const id = li.dataset.id;

  if (e.target.classList.contains('del')) {
    items = items.filter((item) => item.id !== id);
  } else {
    items = items.map((item) => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
  }

  render();
});

render();