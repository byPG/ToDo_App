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

         if (task.done === true) { // If the task is marked as done, add the 'doneTask' class
            li.classList.add('doneTask');
        }
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done; // Set checkbox state based on saved task
        li.appendChild(checkbox);

        const textTask = document.createElement('span');
        textTask.textContent = task.text;
        li.appendChild(textTask);

        const deleteTaskBtn = document.createElement('button');
        deleteTaskBtn.textContent = 'x';
        li.appendChild(deleteTaskBtn);

        deleteTaskBtn.addEventListener('click', () => { //listener jest tworzony dla kazdego taska osobno, więc kiedy klikniemy przycisk usuwania, to usuniemy tylko ten konkretny task, do którego przypisany jest ten listener. W ten sposób możemy mieć wiele zadań na liście, a każde z nich będzie miało swój własny przycisk usuwania, który działa tylko dla tego zadania.
        //local Storage, usuwanie zadania z localStorage
        let tasks = getTasks();
        const taskIndex = tasks.findIndex(item => item.text === task.text); // Find the index of the task in the array based on its text
            if (taskIndex !== -1) { //jesli wynik nie jest -1, to znaczy, że zadanie zostało znalezione w tablicy
                tasks.splice(taskIndex, 1); // Remove the task from the array
                saveTasks(tasks); // Save the updated array back to localStorage
            }
                li.remove();
            });
     
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {  //ticked = true, unticked = false
                li.classList.add('doneTask');
            } else {
                li.classList.remove('doneTask');
            }
            //local Storage, aktualizacja statusu zadania w localStorage
            let tasks = getTasks()
            const taskToUpdate = tasks.find(item => item.text === task.text); // Find the task in the array based on its text; find () zwraca obiekt zadania, który ma zostać zaktualizowany
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

        //local Storage, dodawanie zadania do localStorage
        const newTask = {
            text: taskText,
            done: false
        };
        const tasks = getTasks();
        tasks.push(newTask);
        saveTasks(tasks);
        renderTask(newTask)
        };
    }

buttonAddTask.addEventListener('click', createTask);  // Listen for button click
inputWithTask.addEventListener('keydown', (e) => { // Listen for the Enter key
    if (e.key === 'Enter') {
        createTask();
    }
});

//Odczytywanie zadań z localStorage i wyświetlanie ich na liście, gdy strona się ładuje. Dzięki temu, nawet po odświeżeniu strony, nasze zadania pozostaną na liście.
// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
const savedTasks = getTasks();

//we take the saved tasks from localStorage and create list items for each task, just like we do when we add a new task. We also set the checkbox state and the 'doneTask' class based on the saved task's properties.
savedTasks.forEach((task) => {
    renderTask(task);
});});