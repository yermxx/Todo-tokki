
document.addEventListener('DOMContentLoaded', () => {

const todoInput = document.querySelector('.list-input');
const submitBtn = document.querySelector('.submit-btn');
const todoList = document.getElementById('todo-list');
const rabbitImage = document.querySelector('.rabbit');

function updateRabbitImage() {
  if (todoList.getElementsByTagName('li').length > 0) {
    rabbitImage.style.backgroundImage = "url('./assets/awake-tokki.png')";
  } else {
    rabbitImage.style.backgroundImage = "url('./assets/sleeping-tokki.png')";
  }
}


submitBtn.addEventListener('click', function(event) {

  event.preventDefault();

  if (todoInput !== '') {
  const li = document.createElement("li");

  const checkBox = document.createElement("img");
  checkBox.src = './assets/check.png';
  checkBox.alt = 'checkbox';
  checkBox.classList.add('checkbox');
  checkBox.addEventListener('click', function() {
    if (checkBox.src.includes('check.png')) {
        checkBox.src = './assets/check-focus.png';
    } else {
        checkBox.src = './assets/check.png';
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

  updateRabbitImage();

  });
});


