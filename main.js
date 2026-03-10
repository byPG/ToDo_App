'use strict';

const button = document.getElementById('addTask');
const input = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');


function addTask() {
    const taskText = input.value.trim();
    if (taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        taskList.appendChild(li);
        input.value = '';
    }
}

button.addEventListener('click', addTask);  // Listen for button click

input.addEventListener('keypress', (e) => { // Listen for the Enter key
    if (e.key === 'Enter') {
        addTask();
    }
});
