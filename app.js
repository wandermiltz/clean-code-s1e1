// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

// Problem: user interaction does not provide the correct results.
// Solution: add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById("new-task"); // add a new task
var addButton = document.getElementsByTagName("button")[0]; // first button
var incompleteTaskHolder = document.getElementById("incomplete-tasks"); // ul of #incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); // completed-tasks


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
  label.className = 'task';

  // Each element needs appending:
  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit"; // innerText encodes special characters, HTML does not
  editButton.className = "edit";

  deleteButton.className = "delete";
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

  // Create a new list item with the text from the #new-task:
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

  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".edit");
  var containsClass = listItem.classList.contains("edit-mode");

  if (containsClass) { // if class of the parent is .edit-mode

    // switch to .edit-mode
    // label becomes the inputs value
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }


  listItem.classList.toggle("edit-mode");  // toggle .edit-mode on the parent
};


// Delete task:
var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem); // remove the parent list item from the ul

}


// Mark task completed:
var taskCompleted = function () {
  console.log("Complete Task...");

  // Append the task list item to the #completed-tasks:
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}

// Mark task as incomplete:
var taskIncomplete = function () {
  console.log("Incomplete Task...");
  // When the checkbox is unchecked, append the task list item to the #incomplete-tasks:
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}



var ajaxRequest = function () {
  console.log("AJAX Request");
}

// The glue is to hold it all together


// Set the click handler to the addTask function:
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  // Select list items children:
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");



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