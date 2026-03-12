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

        const delateTaskBtn = document.createElement('button');
        delateTaskBtn.textContent = 'x';
        li.appendChild(delateTaskBtn);

        //local Storage, tablica zadań, dodawanie zadania do localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        //

       const delateTaskFunction = function () {
            delateTaskBtn.addEventListener('click', () => {
                li.remove();
            });
        };
        delateTaskFunction();

       const toggleCheckboxFunction = function () {
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    li.classList.add('doneTask');
                } else {
                    li.classList.remove('doneTask');
                }
            });
        };
        toggleCheckboxFunction();

        };
    }


buttonAddTask.addEventListener('click', createTask);  // Listen for button click
inputWithTask.addEventListener('keydown', (e) => { // Listen for the Enter key
    if (e.key === 'Enter') {
        createTask();
    }
});

// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

savedTasks.forEach((task) => {
    const li = document.createElement('li');
    taskList.appendChild(li);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    li.appendChild(checkbox);

    const textTask = document.createElement('span');
    textTask.textContent = task;
    li.appendChild(textTask);

    const delateTaskBtn = document.createElement('button');
    delateTaskBtn.textContent = 'x';
    li.appendChild(delateTaskBtn);

    delateTaskBtn.addEventListener('click', () => {
        li.remove();
    });

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            li.classList.add('doneTask');
        } else {
            li.classList.remove('doneTask');
        }
    });
});});