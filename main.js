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
        tasks.push({text: taskText, done: false});
        localStorage.setItem('tasks', JSON.stringify(tasks));
        //

       const delateTaskFunction = function () {
            delateTaskBtn.addEventListener('click', () => {
                    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.text === taskText);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

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


            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const taskToUpdate = tasks.find(task => task.text === taskText);

            if (taskToUpdate) {
                taskToUpdate.done = checkbox.checked;
                localStorage.setItem('tasks', JSON.stringify(tasks));
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

    if (task.done) { //
    li.classList.add('doneTask');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done; // Set checkbox state based on saved task
    li.appendChild(checkbox);

    const textTask = document.createElement('span');
    textTask.textContent = task.text;
    li.appendChild(textTask);

    const delateTaskBtn = document.createElement('button');
    delateTaskBtn.textContent = 'x';
    li.appendChild(delateTaskBtn);

    delateTaskBtn.addEventListener('click', () => {
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(item => item.text === task.text);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }


        li.remove();
    });

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            li.classList.add('doneTask');
        } else {
            li.classList.remove('doneTask');
        }

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskToUpdate = tasks.find(item => item.text === task.text);

        if (taskToUpdate) {
            taskToUpdate.done = checkbox.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        });
});});