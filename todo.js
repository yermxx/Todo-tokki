
document.addEventListener('DOMContentLoaded', () => {

const todoInput = document.querySelector('.list-input');
const submitBtn = document.querySelector('.submit-btn');
const todoList = document.getElementById('todo-list');
const rabbitImage = document.querySelector('.rabbit');
const allCheck = document.getElementById('all-check');
const allDelete = document.getElementById('all-delete');

function updateRabbitImage() {
  if (todoList.getElementsByTagName('li').length > 0) {
    rabbitImage.style.backgroundImage = "url('./assets/awake-tokki.png')";
  } else {
    rabbitImage.style.backgroundImage = "url('./assets/sleeping-tokki.png')";
  }
}

function areAllChecked() {
  const checkboxes = document.querySelectorAll('.checkbox');
  return Array.from(checkboxes).every(checkbox => checkbox.dataset.checked === 'true');
}

submitBtn.addEventListener('click', function(event) {

  event.preventDefault();

  if (todoInput.value !== '') {
  const li = document.createElement("li");

  const checkBox = document.createElement("img");
  checkBox.src = './assets/check.png';
  checkBox.alt = 'checkbox';
  checkBox.classList.add('checkbox');
  checkBox.dataset.checked = 'false'
  checkBox.addEventListener('click', function() {
    if (checkBox.dataset.checked === 'false') {
        checkBox.src = './assets/check-focus.png';
        checkBox.dataset.checked = 'true';
    } else {
        checkBox.src = './assets/check.png';
        checkBox.dataset.checked = 'false';
    }
  });

  const span = document.createElement('span');
  span.textContent = todoInput.value;
  span.classList.add('todo-text');

  const deleteIcon = document.createElement('img');
  deleteIcon.src = './assets/delete-icon.png';
  deleteIcon.alt = 'Delete';
  deleteIcon.classList.add('delete-icon');
  deleteIcon.addEventListener('click', function() {
    todoList.removeChild(li);
    updateRabbitImage();
  });

  deleteIcon.addEventListener('mouseover', () => {
    deleteIcon.src = './assets/delete-icon-green.png';
  });
  deleteIcon.addEventListener('mouseout', () => {
    deleteIcon.src = './assets/delete-icon.png';
  });

  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(deleteIcon);

  todoList.appendChild(li);
  todoInput.value= "";

  updateRabbitImage();
  }
  });

  allCheck.addEventListener('click', function(event) {
    event.preventDefault();
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.click();
    });
  });

  allDelete.addEventListener('click', function(event) {
    event.preventDefault();
    if (areAllChecked()) {
      const todos = todoList.querySelectorAll('li');
      todos.forEach((li) => {
          todoList.removeChild(li);
      });
      updateRabbitImage();
    } else {
     alert('전체 선택 후 삭제 가능');
    }
  });

  updateRabbitImage();
});



