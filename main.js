let input = document.querySelector('.input');
let btn = document.querySelector('.add');
let tasks = document.querySelector('.tasks');
let task = document.querySelector('.task');

getFromLocalStorage();

btn.onclick = () => {
	if (input.value !== '') {
		addTask();
		addInLocalStorage();
		input.value = '';
		input.style.border = 'none';
	} else {
		input.style.border = '1px solid red';
		console.log('No Message here');
	}
};
function addInLocalStorage() {
	window.localStorage.setItem(input.value, input.value);
}
function getFromLocalStorage() {
	for(let i=0;i< window.localStorage.length;i++) {
		let task = document.createElement('div');
		let span = document.createElement('span');
		let txt = document.createTextNode(window.localStorage.key(i));
		span.append('Delete');
		task.className = 'task';
		task.append(span);
		task.append(txt);
		tasks.appendChild(task);
		span.onclick = () => {
			task.remove();
			removeFromLocal();
			localStorage.removeItem(window.localStorage.key(i));
		};
	}
}

function addTask() {
	let task = document.createElement('div');
	let span = document.createElement('span');
	let txt = document.createTextNode(input.value);
	span.append('Delete');
	task.className = 'task';
	task.append(span);
	task.append(txt);
	tasks.appendChild(task);
	span.onclick = () => {
		task.remove();
	};
}