document.addEventListener('DOMContentLoaded', () => {

  const todoInput = document.querySelector('.list-input');
  const submitBtn = document.querySelector('.submit-btn');
  const todoList = document.getElementById('todo-list');

  const tokkiImage = document.querySelector('.tokki');

  const allCheck = document.getElementById('all-check');
  const allCheckImage = allCheck.querySelector('img');
  const allDelete = document.getElementById('all-delete');
  const allDeleteImage = allDelete.querySelector('img');

  let saveTask = [];

  /* ADD 버튼 click 시 이벤트 실행 */
  submitBtn.addEventListener('click', function(event) {

    event.preventDefault();

    /* localStorage에 tasks 저장 */
    function saveTasks() {
      localStorage.setItem('saveTask', JSON.stringify(saveTask));
    }

    /* localStorage에서 데이터 불러오기 */
    function loadTasks() {
    const savedTasks = localStorage.getItem('li');
    if (savedTasks) {
      todoList = JSON.parse(savedTasks);
      renderTodos();
      }
    }

    /* 토끼 이미지 상태 업데이트 */
    function updateTokkiImage() {
      tokkiImage.style.backgroundImage = todoList.getElementsByTagName('li').length > 0
        ? "url('./assets/awake-miffy.png')"
        : "url('./assets/sleeping-miffy.png')";
    }

    if (todoInput.value !== '') {
    const li = document.createElement('li');

    const checkBox = document.createElement('img');
    checkBox.src = './assets/check.png';
    checkBox.alt = 'checkbox';
    checkBox.classList.add('checkbox');
    checkBox.dataset.checked = 'false'

    checkBox.addEventListener('click', function() {
      if (checkBox.dataset.checked === 'false') {
          span.style.textDecoration = 'line-through';
          span.style.textDecoration.color = '#fff';
          span.style.color = '#fff';
          checkBox.src = './assets/check-white.png';
          checkBox.dataset.checked = 'true';
      } else {
          span.style.textDecoration = 'none';
          span.style.color = '';
          checkBox.src = './assets/check.png';
          checkBox.dataset.checked = 'false';
      }
      saveTasks();
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
      updateTokkiImage();
      updateAllCheckState();
      updateTaskCount();

      /* saveTask 배열에서 해당 항목 제거 */
      const index = saveTask.findIndex(task => task.text === taskText);
      if (index > -1) {
        saveTask.splice(index, 1);
        saveTasks();
      }

      const updateDeleteIcons = document.querySelectorAll('.delete-icon').length;
      if (updateDeleteIcons === 0) {
          location.reload();
      }
    });

    deleteIcon.addEventListener('mouseover', () => {
      deleteIcon.src = './assets/delete-icon-white.png';
    });
    deleteIcon.addEventListener('mouseout', () => {
      deleteIcon.src = './assets/delete-icon.png';
    });

    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(deleteIcon);

    todoList.appendChild(li);

    todoInput.value= '';
    todoInput.focus();

    /* 리스트의 마지막 항목으로 자동 스크롤 */
    todoList.scrollTop = todoList.scrollHeight;

    updateTokkiImage();
    updateTaskCount();
    saveTasks();
    }
    });

  /* 태스크 개수 업데이트 */
  function updateTaskCount() {
    const taskCount = document.getElementById('taskCount');
    const tasks = todoList.getElementsByTagName('li').length;

    if (tasks > 0) {
      taskCount.textContent = `🥕 ${tasks} Tasks!`;
    } else {
      taskCount.textContent = '';
    }
  }

  /* 현재 날짜 및 시간 나타내기 */
  const showDate = () => {
    const now = new Date();
    // const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[now.getDay()];
  
    return `${month}월 ${day}일 ${weekday}요일`;
  };

  function displayDateTime() {
    const dateTime = showDate();
    document.getElementById('showDate').innerText = dateTime;
  }

  window.onload = function() {
    displayDateTime();
  }

  /* 전체 선택 요소 상태 확인 */
  function areAllChecked() {
    const checkboxes = document.querySelectorAll('.checkbox');
    return Array.from(checkboxes).every(checkbox => checkbox.dataset.checked === 'true');
  }

  /* 전체 선택 상태 업데이트 */
  function updateAllCheckState() {
    if (areAllChecked()) {
      allCheck.style.color = '#fff';
      allCheckImage.src = './assets/all-check-white.png';
      allCheck.dataset.checked = 'true';
    } else {
      allCheck.style.color = '';
      allCheckImage.src = './assets/all-check.png';
      allCheck.dataset.checked = 'false';
    }
  }

  /* 전체 선택 click 이벤트 */
  allCheck.addEventListener('click', function(event) {
    allCheck.dataset.checked = 'false';
    event.preventDefault();

    const checkboxes = document.querySelectorAll('.checkbox');
    const todoText = document.querySelectorAll('.todo-text');

    if (!areAllChecked()) {
      checkboxes.forEach((checkbox) => {
        checkbox.src = './assets/check-white.png';
        checkbox.dataset.checked = 'true';
      });
      todoText.forEach((todoText) => {
        todoText.style.textDecoration = 'line-through';
        todoText.style.textDecoration.color = '#fff';
        todoText.style.color = '#fff';
      });
      allCheck.style.color = '#fff';
      allCheckImage.src = './assets/all-check-white.png';
      allCheck.dataset.checked = 'true';
    } else {
      checkboxes.forEach((checkbox) => {
        checkbox.src = './assets/check.png';
        checkbox.dataset.checked = 'false';
      });
      todoText.forEach((todoText) => {
        todoText.style.textDecoration = 'none';
        todoText.style.color = '';
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
      allDelete.style.color = '#fff';
      allDeleteImage.src = './assets/all-delete-white.png';
      const toDos = todoList.querySelectorAll('li');
      toDos.forEach((li) => {
        todoList.removeChild(li);
      });
      location.reload();
      updateTokkiImage();
      updateAllCheckState();
      updateTaskCount();
    } else {
      alert('전체 삭제를 위해서는 먼저 전체 선택을 해주세요!');
    }
  });

  updateTokkiImage();
  updateAllCheckState();
  updateTaskCount();
});

/* 페이지 로드 시 저장된 데이터 불러오기 */
document.addEventListener('DOMContentLoaded', loadTasks);