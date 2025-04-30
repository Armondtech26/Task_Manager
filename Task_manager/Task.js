document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const taskManagerDiv = document.getElementById('taskmanager');
    let tasks = [];

    function renderTasks() {
        taskManagerDiv.innerHTML = '';
        tasks.forEach((task) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.style.border = '1px solid #ccc';
            taskElement.style.padding = '10px';
            taskElement.style.marginBottom = '10px';
            taskElement.style.borderRadius = '5px';
            taskElement.style.backgroundColor = '#f9f9f9';
            taskElement.style.display = 'flex';
            taskElement.style.alignItems = 'center';
            taskElement.style.justifyContent = 'space-between';

            if (task.isImportant) {
                taskElement.style.backgroundColor = 'red';
                taskElement.style.color = 'white';
            }

            if (task.isCompleted) {
                taskElement.style.textDecoration = 'line-through';
            }

            taskElement.innerHTML = `
                <p><strong>Task:</strong> ${task.name}</p>
                <p><strong>Priority:</strong> ${task.priority}</p>
                <p><strong>Date Added:</strong> ${task.date}</p>
                <button class="toggle-completed">${task.isCompleted ? 'Undo' : 'Done'}</button>
                <button class="delete-task">Delete</button>
            `;

            taskElement.querySelector('.toggle-completed').addEventListener('click', (event) => {
                task.isCompleted = !task.isCompleted;
                event.target.textContent = task.isCompleted ? 'Undo' : 'Done';
                renderTasks();
                logTasks();
            });

            taskElement.querySelector('.delete-task').addEventListener('click', () => {
                tasks = tasks.filter((t) => t.id !== task.id);
                renderTasks();
                logTasks();
            });

            taskManagerDiv.appendChild(taskElement);
        });
    }

    function logTasks() {
        console.log(JSON.stringify(tasks, null, 2));
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskName = document.getElementById('task').value;
        const priority = document.getElementById('priority').value;
        const isImportant = document.getElementById('important').checked;
        const dateAdded = new Date().toLocaleString();

        const newTask = {
            id: Date.now(),
            name: taskName,
            priority: priority,
            isImportant: isImportant,
            isCompleted: false,
            date: dateAdded,
        };

        tasks.push(newTask);
        logTasks();
        renderTasks();
        form.reset();
    });
});