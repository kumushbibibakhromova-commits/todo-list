
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

// Update the number of unfinished tasks
function updateCount() {
    const remaining = taskList.querySelectorAll(
        "li:not(.done)"
    ).length;

    taskCount.textContent = `${remaining} task${remaining !== 1 ? "s" : ""} remaining`;
}

// Add a task
function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        taskInput.focus();
        return;
    }

    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    checkbox.type = "checkbox";
    span.textContent = text;

    editBtn.textContent = "Edit";
    editBtn.type = "button";
    editBtn.className = "edit-btn";

    deleteBtn.textContent = "✕";
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.setAttribute("aria-label", "Delete task");

    // Complete or uncomplete a task
    checkbox.addEventListener("change", function () {
        li.classList.toggle("done", checkbox.checked);
        updateCount();
    });

    // Edit a task
    editBtn.addEventListener("click", function () {
        const newText = prompt("Edit your task:", span.textContent);

        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
        }
    });

    // Delete a task
    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateCount();
    });

    // Put all elements inside the task
    li.append(checkbox, span, editBtn, deleteBtn);

    // Display the task
    taskList.appendChild(li);

    // Clear the input
    taskInput.value = "";
    taskInput.focus();

    updateCount();
}

// Add task when the button is clicked
addBtn.addEventListener("click", addTask);

// Add task when Enter is pressed
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Set the initial task count
updateCount();
