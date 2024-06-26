document.addEventListener('DOMContentLoaded', () => {

  const todoInput = document.querySelector('.list-input');
  const submitBtn = document.querySelector('.submit-btn');
  const todoList = document.getElementById('todo-list');

  const tokkiImage = document.querySelector('.tokki');

  const allCheck = document.getElementById('all-check');
  const allCheckImage = allCheck.querySelector('img');
  const allDelete = document.getElementById('all-delete');
  const allDeleteImage = allDelete.querySelector('img');

  /* ADD 버튼 click 시 이벤트 실행 */
  submitBtn.addEventListener('click', function(event) {

    event.preventDefault();

    if (todoInput.value !== '') {
    const li = document.createElement('li');

    const checkBox = document.createElement('img');
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

    /* 토끼 이미지 상태 업데이트 */
    function updateTokkiImage() {
      tokkiImage.style.backgroundImage = todoList.getElementsByTagName('li').length > 0
        ? "url('./assets/awake-tokki.png')"
        : "url('./assets/sleeping-tokki.png')";
    }

    const span = document.createElement('span');
    span.textContent = todoInput.value;
    span.classList.add('todo-text');

    const deleteIcon = document.createElement('img');
    deleteIcon.src = './assets/delete-icon.png';
    deleteIcon.alt = 'Delete';
    deleteIcon.classList.add('delete-icon');
    deleteIcon.addEventListener('click', function() {
      todoList.removeChild(li);
      updateTokkiImage();
      updateAllCheckState();
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
    todoInput.value= '';

    updateTokkiImage();
    updateAllCheckState();
    }
    });

  /* 전체 선택 요소 상태 확인 */
  function areAllChecked() {
    const checkboxes = document.querySelectorAll('.checkbox');
    return Array.from(checkboxes).every(checkbox => checkbox.dataset.checked === 'true');
  }

  /* 전체 선택 상태 업데이트 */
  function updateAllCheckState() {
    if (areAllChecked()) {
      allCheck.style.color = '#ACCF61';
      allCheckImage.src = './assets/all-check-green.png';
      allCheck.dataset.checked = 'true';
    } else {
      allCheck.style.color = '';
      allCheckImage.src = './assets/all-check.png';
      allCheck.dataset.checked = 'false';
    }
  }

  /* 전체 선택 click 이벤트 */
  allCheck.dataset.checked = 'false';
  allCheck.addEventListener('click', function(event) {
    event.preventDefault();

    const checkboxes = document.querySelectorAll('.checkbox');

    if (allCheck.dataset.checked === 'false') {
      checkboxes.forEach((checkbox) => {
        checkbox.src = './assets/check-focus.png';
        checkbox.dataset.checked = 'true';
      });
      allCheck.style.color = '#ACCF61';
      allCheckImage.src = './assets/all-check-green.png';
      allCheck.dataset.checked = 'true';
    } else {
      checkboxes.forEach((checkbox) => {
        checkbox.src = './assets/check.png';
        checkbox.dataset.checked = 'false';
      });
      allCheck.style.color = '';
      allCheckImage.src = './assets/all-check.png';
      allCheck.dataset.checked = 'false';
    }
  });

  /* 전체 삭제 click 이벤트 */
  allDelete.addEventListener('click', function(event) {
    event.preventDefault();

    if (areAllChecked()) {
      allDelete.style.color = '#ACCF61';
      allDeleteImage.src = './assets/all-delete-green.png';
      const toDos = todoList.querySelectorAll('li');
      toDos.forEach((li) => {
        todoList.removeChild(li);
      });
      location.reload();
      updateTokkiImage();
      updateAllCheckState();
    } else {
      alert('전체 삭제를 위해서는 먼저 전체 선택을 해주세요!');
    }
  });

  updateTokkiImage();
  updateAllCheckState();
});