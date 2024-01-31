const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  if (newItem === '' || newItem.trim() === '') {
    alert('Please add value');
    return;
  }

  const li = document.createElement('li');
  const text = document.createTextNode(newItem);
  li.appendChild(text);

  const btn = createBtn('remove-item btn-link text-red');
  li.appendChild(btn);

  itemList.appendChild(li);

  newItem = '';
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
itemForm.addEventListener('submit', addItem);
