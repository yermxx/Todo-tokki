document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.querySelector('.list-input');
  const submitBtn = document.querySelector('.submit-btn');
  const todoList = document.getElementById('todo-list');

  const tokkiImage = document.querySelector('.tokki');

  const allCheck = document.getElementById('all-check');
  const allCheckImage = allCheck.querySelector('img');
  const allDelete = document.getElementById('all-delete');
  const allDeleteImage = allDelete.querySelector('img');

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

  window.onload = function () {
    displayDateTime();
  };

  /* 로컬에 저장하는 태스크배열 */
  let saveTask = [];

  /* localStorage에 tasks 저장 */
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(saveTask));
  }

  /* localStorage에서 데이터 불러오기 */
  function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      saveTask = JSON.parse(savedTasks);
      saveTask.forEach((task) => {
        createTodoElement(task);
      });
    }
  }

  /* 토끼 이미지 상태 업데이트 */
  function updateTokkiImage() {
    tokkiImage.style.backgroundImage =
      todoList.getElementsByTagName('li').length > 0
        ? "url('./assets/awake-miffy.png')"
        : "url('./assets/sleep-miffy.png')";
  }

  /* 태스크 개수 업데이트 */
  function updateTaskCount() {
    const taskCount = document.getElementById('taskCount');
    const tasks = todoList.getElementsByTagName('li').length;

    if (tasks > 0) {
      taskCount.textContent = `🥕 ${tasks} Tasks!`;
    } else {
      taskCount.textContent;
    }
  }

  /* 전체 선택 요소 상태 확인 */
  function areAllChecked() {
    const checkboxes = document.querySelectorAll('.checkbox');
    return Array.from(checkboxes).every((checkbox) => checkbox.dataset.checked === 'true');
  }

  /* 전체 선택 상태 업데이트 */
  function updateAllCheckState() {
    if (areAllChecked()) {
      allCheck.dataset.checked = 'true';
    } else {
      allCheck.style.color = '';
      allCheckImage.src = './assets/all-check.png';
      allCheck.dataset.checked = 'false';
    }
  }

  /* 상태 변경 시 UI 업데이트 */
  function updateUI() {
    updateTokkiImage();
    updateTaskCount();
    updateAllCheckState();
  }

  function createTodoElement(taskText) {
    const li = document.createElement('li');

    const checkBox = document.createElement('img');
    checkBox.src = './assets/check.png';
    checkBox.alt = 'checkbox';
    checkBox.classList.add('checkbox');
    checkBox.dataset.checked = 'false';

    checkBox.addEventListener('click', function () {
      if (checkBox.dataset.checked === 'false') {
        span.style.textDecoration = 'line-through';
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
    span.textContent = taskText;
    span.classList.add('todo-text');

    const deleteIcon = document.createElement('img');
    deleteIcon.src = './assets/delete-icon.png';
    deleteIcon.alt = 'Delete';
    deleteIcon.classList.add('delete-icon');
    deleteIcon.addEventListener('click', function () {
      todoList.removeChild(li);
      updateUI();

      /* saveTask 배열에서 해당 항목 제거 */
      const index = saveTask.findIndex((task) => task === taskText);
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

    todoInput.value = '';
    todoInput.focus();

    /* 리스트의 마지막 항목으로 자동 스크롤 */
    todoList.scrollTop = todoList.scrollHeight;

    updateUI();
  }

  /* ADD 버튼 click 시 이벤트 실행 */
  submitBtn.addEventListener('click', function (event) {
    event.preventDefault();

    /* inputValue 유효성 검사 */
    if (!todoInput.value || todoInput.value.trim() === '') {
      return;
    }
    saveTask.push(todoInput.value);
    saveTasks();
    createTodoElement(todoInput.value);

    /* 버튼 애니메이션 관리 */
    this.classList.add('animate');
    setTimeout(() => this.classList.remove('animate'), 1200);
  });

  /* 전체 선택 click 이벤트 */
  allCheck.addEventListener('click', function (event) {
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
      });
      allCheck.style.fontWeight = '900';
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
      allCheck.style.fontWeight = 'normal';
      allCheck.style.color = '';
      allCheckImage.src = './assets/all-check.png';
      allCheck.dataset.checked = 'false';
    }
  });

  /* 전체 삭제 click 이벤트 */
  allDelete.addEventListener('click', function (event) {
    event.preventDefault();

    if (areAllChecked()) {
      confirm('정말 모든 리스트를 삭제하겠습니까?');
      localStorage.removeItem('tasks');
      location.reload();
      updateUI();
    } else {
      alert('전체 삭제를 위해서는 먼저 전체 선택을 해주세요!');
      return;
    }
  });

  /* 페이지 로드 시 저장된 데이터 불러오기 */
  loadTasks();

  updateUI();
});
