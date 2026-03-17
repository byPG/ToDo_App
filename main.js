'use strict';

const buttonAddTask = document.getElementById('addTask');
const inputWithTask = document.getElementById('taskInput');
const ulTaskList = document.getElementById('taskList');

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
        const li = document.createElement('li');
        ulTaskList.appendChild(li);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        li.appendChild(checkbox);

        const textTask = document.createElement('span');
        textTask.textContent = task.text;
        li.appendChild(textTask);

        if (task.done === true) { 
               textTask.classList.add('doneTask');
               li.style.backgroundColor = '#d4fbde'; 
            }

        const editTaskBtn = document.createElement('button');
        editTaskBtn.textContent = 'Edit';
        editTaskBtn.classList.add('editTaskBtn');
        li.appendChild(editTaskBtn);

        editTaskBtn.addEventListener('click', () => {
        const tasks = getTasks();
        const taskIndex = tasks.findIndex(item => item.id === task.id); 
            if (taskIndex !== -1) {
                const newText = prompt('Edit task:', tasks[taskIndex].text); 
                if (newText !== null && newText.trim() !== '') { 
                    tasks[taskIndex].text = newText.trim(); 
                    saveTasks(tasks); 
                    textTask.textContent = newText.trim(); 
                }
            }
          
            });

        const deleteTaskBtn = document.createElement('button');
        deleteTaskBtn.textContent = 'x';
        li.appendChild(deleteTaskBtn);

        deleteTaskBtn.addEventListener('click', () => { 
        const tasks = getTasks();
        const taskIndex = tasks.findIndex(item => item.id === task.id);
            if (taskIndex !== -1) { 
                tasks.splice(taskIndex, 1);
                saveTasks(tasks);
            }
                li.remove();
            });

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) { 
                textTask.classList.add('doneTask');
                li.style.backgroundColor = '#d4fbde'
            } else {
                textTask.classList.remove('doneTask');
                li.style.backgroundColor = '#c6d8ff';
            }
        
            let tasks = getTasks()
            const taskToUpdate = tasks.find(item => item.id === task.id);
            if (taskToUpdate) {
                taskToUpdate.done = checkbox.checked;
                saveTasks(tasks);
            } 
            });
        };

function createTask() {
    const taskText = inputWithTask.value.trim();

    if (taskText) {
        inputWithTask.value = '';

        const newTask = {
            text: taskText,
            done: false,
            id: Date.now()
        };

        const tasks = getTasks();
        tasks.push(newTask);
        saveTasks(tasks);
        renderTask(newTask)
        };
    }

buttonAddTask.addEventListener('click', createTask); 
inputWithTask.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        createTask();
    }
});

document.addEventListener("DOMContentLoaded", function () {
const savedTasks = getTasks();

savedTasks.forEach((task) => {
    renderTask(task);
});});