document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and display them
    function loadTasks() {
        // Retrieve tasks from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Add each task to the DOM
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' means don't save again
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Trim and check if the task text is not empty
        taskText = taskText.trim();
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            // Remove the task from the list
            taskList.removeChild(listItem);

            // Remove the task from Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Save the task to Local Storage if required
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field
        taskInput.value = '';
    }

    // Attach event listeners
    addButton.addEventListener('click', function() {
        addTask(taskInput.value);
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
            event.preventDefault(); // Prevent form submission or additional actions
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
