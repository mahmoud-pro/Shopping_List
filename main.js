const itemInput = document.getElementById('item-input');
const itemForm = document.getElementById('item-form');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.querySelector('.filter');

function addItem(e) {
  e.preventDefault();

  let newItem = itemInput.value;

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

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
}

function contentFilter(e) {
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

function checkUI() {
  const items = document.querySelectorAll('li');

  if (items.length === 0) {
    (clearBtn.style.display = 'none'), (itemFilter.style.display = 'none');
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', contentFilter);

checkUI();
