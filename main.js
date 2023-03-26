let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let tasks = document.querySelector('.tasks');
let deleteAll = document.querySelector('.del-all');

arrayOfTasks = [];

// Check If Theres Tasks In Local Storage
if(localStorage.tasks) {
  arrayOfTasks = JSON.parse(localStorage.tasks);
}

// Trigger Function
getDataFromLocalStorage();

document.onkeyup = function (e) {
  if(e.key === 'Enter') {
    if(input.value !== '') {
      addTask(input.value); //add task to array of tasks
      input.value = ''; //empty input field
		input.focus();
    }
  }
}

submit.onclick = function () {
  if(input.value !== '') {
    addTask(input.value); //add task to array of tasks
    input.value = ''; //empty input field
		input.focus();
  }
}
 // Click On Delete All Butto
 deleteAll.onclick = function () {
  tasks.innerHTML = '';
  localStorage.removeItem('tasks');
 }
// Click On Task Element
tasks.addEventListener('click',(e)=>{
  // Delete Button
  if(e.target.classList.contains('del')) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute('data-id'));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  // Task Element
  if(e.target.classList.contains('task')) {
    // Toggle Completed For The Task
    taskToggleStatusWith(e.target.getAttribute('data-id'));
    // add class done
    e.target.classList.toggle('done');
  }
})

function addTask (taskName) {
  const task = {
    id: Date.now(),
    title: taskName,
    completed: false,
  }
  // push task to array
  arrayOfTasks.push(task);
  // add tasks to page with funtion
  addElementToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementToPageFrom(arrayOfTasks) {
// Empty the Tasks Div
tasks.innerHTML = '';
arrayOfTasks.forEach((task) => {
  let div = document.createElement('div');
  div.className = 'task';
  // Check If Task Is Done
  if(task.completed) {
    div.className = 'task done';
  }
  div.setAttribute('data-id',task.id);
  div.appendChild(document.createTextNode(task.title));
  // Create Delete Button
  let span = document.createElement('span');
  span.className = 'del';
  span.appendChild(document.createTextNode('delete'));
  div.appendChild(span);
  // add Task to Tasks Div
  tasks.appendChild(div);
});
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem('tasks',JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem('tasks');
  if(data) {
    let tasks = JSON.parse(data);
    addElementToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function taskToggleStatusWith(taskId) {
  for(let i=0;i< arrayOfTasks.length;i++) {
    // console.log(arrayOfTasks[i].id);
    if(arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed === false?arrayOfTasks[i].completed = true:arrayOfTasks[i].completed = false;
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}