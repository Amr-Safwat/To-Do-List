let input = document.querySelector('.input');
let btn = document.querySelector('.add');
let tasks = document.querySelector('.tasks');

let task = document.createElement('div');
let span = document.createElement('span');
span.append('Delete');
task.className = 'task';

for (let i = 0; i <= window.localStorage.length; i++) {
	if (window.localStorage.key(i)) {
		getFromLocal(i);
	} else {
		console.log('No');
	}
}
let tasksList = document.querySelectorAll('.task');

function getFromLocal(i) {
	let task = document.createElement('div');
	let span = document.createElement('span');
	span.append('Delete');
	task.className = 'task';
	task.append(span);
	task.append(window.localStorage.key(i));
	tasks.appendChild(task);
}

function addTask() {
	let task = document.createElement('div');
	let span = document.createElement('span');
	let txt = document.createTextNode(`${input.value}`);
	span.append('Delete');
	task.className = 'task';
	task.append(span);
	task.append(txt);
	tasks.appendChild(task);
}

btn.onclick = function () {
	if (input.value !== '') {
		addTask();
		addInLocalStorage();
		input.value = '';
	} else {
		console.log('No Message here');
	}
};

let i = 1;
function addInLocalStorage() {
	window.localStorage.setItem(input.value, input.value);
}

tasksList.forEach((t) => {
	t.onclick = () => {
		window.localStorage.removeItem(t.lastChild);
		tasks.removeChild(t);
	};
});
