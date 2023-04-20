// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.
// Problem: user interaction does not provide the correct results.
// Solution: add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.
// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById("task-input-add");
var addButton = document.getElementById("task-btn-add");
var incompleteTaskHolder = document.getElementById("incomplete-tasks"); // list of incomplete tasks
var completedTasksHolder = document.getElementById("completed-tasks"); // list of completed tasks

// New task list item:
var createNewTaskElement = function (taskString) {

  var listItem = document.createElement("li"); // list item
  var checkBox = document.createElement("input"); // input (checkbox)
  var label = document.createElement("label"); // label
  var editInput = document.createElement("input"); // input (text)
  var editButton = document.createElement("button"); // edit button
  var deleteButton = document.createElement("button"); // delete button
  var deleteButtonImg = document.createElement("img"); // delete button image

  label.innerText = taskString;
  label.className = 'task__label';

  // Each element needs appending:
  listItem.className = "task"
  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";
  editInput.type = "text";
  editInput.className = "task__input";
  editButton.innerText = "Edit"; // innerText encodes special characters, HTML does not
  editButton.className = "task__btn task__btn_edit";
  deleteButton.className = "task__btn task__btn_delete";
  deleteButtonImg.className = "task__icon_delete";
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  // Appending:
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function () {
  console.log("Add Task...");
  // Create a new list item with the text from task input:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);
  // Append list item to incompleteTaskHolder:
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

// Edit an existing task:
var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector('.task__input');
  var label = listItem.querySelector(".task__label");
  var editBtn = listItem.querySelector(".task__btn");
  var containsClass = listItem.classList.contains("task_edit-mode");

  if (containsClass) { // if parent in the edit mode
    // switch to task edit mode
    // label becomes the inputs value
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("task_edit-mode");
  editInput.classList.toggle("task__input_edit-mode")
  label.classList.toggle("task__label_edit-mode")
};

// Delete task:
var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem); // remove item from the list
}

// Mark task as completed:
var taskCompleted = function () {
  console.log("Complete Task...");

  var listItem = this.parentNode;
  var label = listItem.querySelector(".task__label");

  // Append the task list item to the completed tasks:
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
  label.classList.toggle("task__label_completed")
}

// Mark task as incomplete:
var taskIncomplete = function () {
  console.log("Incomplete Task...");

  var listItem = this.parentNode;
  var label = listItem.querySelector(".task__label");

  // When the checkbox is unchecked, append the task list item to the incomplete tasks:
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  label.classList.toggle("task__label_completed")
}

var ajaxRequest = function () {
  console.log("AJAX Request");
}

// The glue is to hold it all together:

// Set the click handler to the addTask function:
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  // Select list items children:
  var checkBox = taskListItem.querySelector(".task__checkbox");
  var editButton = taskListItem.querySelector(".task__btn_edit");
  var deleteButton = taskListItem.querySelector(".task__btn_delete");

  editButton.onclick = editTask;  // bind edit task to edit button
  deleteButton.onclick = deleteTask; // bind delete task to delete button
  checkBox.onchange = checkBoxEventHandler;  // bind task complete to checkBoxEventHandler
}

// Cycle over incompleteTaskHolder ul list items:
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  // For each list item bind events to list items children (tasks completed):
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// Cycle over completedTasksHolder ul list items:
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  // Bind events to list items children (tasks incomplete):
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.
// Prevent creation of empty tasks.
// Change edit to save when you are in edit mode.