'use strict';

const button = document.getElementById('addTask');
const input = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');


function addAndDeleteTask() {
    const taskText = input.value.trim();

    if (taskText) {
        const li = document.createElement('li');
        li.textContent = taskText; 
        taskList.appendChild(li);
        input.value = '';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        li.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', () => {
        li.remove(); // Remove the task item when delete button is clicked
});
    }
}

button.addEventListener('click', addAndDeleteTask);  // Listen for button click
input.addEventListener('keypress', (e) => { // Listen for the Enter key
    if (e.key === 'Enter') {
        addAndDeleteTask();
    }
});


