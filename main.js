'use strict';

const buttonAddTask = document.getElementById('addTask');
const inputWithTask = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');


function createTask() {
    const taskText = inputWithTask.value.trim();

    if (taskText) {
        const li = document.createElement('li');
        taskList.appendChild(li);
        inputWithTask.value = '';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        li.appendChild(checkbox);

        const textTask = document.createElement('span');
        textTask.textContent = taskText;
        li.appendChild(textTask);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'x';
        li.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', () => {
        li.remove(); })

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                li.classList.add('doneTask');
                li.removeChild(deleteBtn);
            } else {
                li.classList.remove('doneTask');
                li.appendChild(deleteBtn);
            }
        });

    }
}


buttonAddTask.addEventListener('click', createTask);  // Listen for button click
inputWithTask.addEventListener('keydown', (e) => { // Listen for the Enter key
    if (e.key === 'Enter') {
        createTask();
    }
});


