const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.querySelector('.filter');

function displayItems() {
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  let newItem = itemInput.value;

  if (newItem === '' || newItem.trim() === '') {
    alert('Please add value');
    return;
  }

  addItemToDOM(newItem);

  addItemToStorage(newItem);

  checkUI();
  itemInput.value = '';
}

function createBtn(classes) {
  const btn = document.createElement('button');
  btn.className = classes;

  const icon = createIcon('fa-solid fa-xmark');
  btn.appendChild(icon);
  return btn;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addItemToDOM(item) {
  const li = document.createElement('li');
  const text = document.createTextNode(item);
  li.appendChild(text);

  const btn = createBtn('remove-item btn-link text-red');
  li.appendChild(btn);

  itemList.appendChild(li);
}

function getItemFromStorage() {
  let itemFromLocalStorage;

  if (localStorage.getItem('items') === null) {
    itemFromLocalStorage = [];
  } else {
    itemFromLocalStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemFromLocalStorage;
}

function addItemToStorage(item) {
  const itemFromStorage = getItemFromStorage();

  itemFromStorage.push(item);
  localStorage.setItem('items', JSON.stringify(itemFromStorage));
}

function removeFromStorage(item) {
  let itemFromStorage = getItemFromStorage();

  itemFromStorage = itemFromStorage.filter((i) => i !== item);
  localStorage.setItem('items', JSON.stringify(itemFromStorage));
}

function checkUI() {
  const items = document.querySelectorAll('li');

  if (items.length === 0) {
    (clearBtn.style.display = 'none'), (itemFilter.style.display = 'none');
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  }
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    item.remove();
    removeFromStorage(item.textContent);
    checkUI();
  }
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  localStorage.removeItem('items');
  checkUI();
}

function filterData(e) {
  const items = document.querySelectorAll('li');
  const text = e.target.value.trim().toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.trim().toLowerCase();

    if (itemName.indexOf(text) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function init() {
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterData);
  document.addEventListener('DOMContentLoaded', displayItems);
  checkUI();
}

init();
