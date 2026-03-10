'use strict';

const buttonAddTask = document.getElementById('addTask');
const inputWithTask = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');


function addAndDeleteTask() {
    const taskText = inputWithTask.value.trim();

    if (taskText) {
        const li = document.createElement('li');
        li.textContent = taskText; 
        taskList.appendChild(li);
        inputWithTask.value = '';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        li.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', () => {
        li.remove(); // Remove the task item when delete button is clicked
});
    }
}

buttonAddTask.addEventListener('click', addAndDeleteTask);  // Listen for button click
inputWithTask.addEventListener('keypress', (e) => { // Listen for the Enter key
    if (e.key === 'Enter') {
        addAndDeleteTask();
    }
});


