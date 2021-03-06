var items = [{ id: 1, title: "My Day", task: [] },
{ id: 2, title: "Important", task: [] },
{ id: 3, title: "Planned", task: [] },
{ id: 4, title: "Assigned to me", task: [] },
{ id: 5, title: "Flagged email", task: [] },
{ id: 6, title: "Task", task: [] }];

(function init() {
  displayLeftSubTopics();
  dateAndDay();
  renderStepTaskTitle();
  addStepTaskList();
  completedTask();
})();

function dateAndDay() {
  var today = new Date();
  var day = today.getDay();
  var month = today.getMonth();
  var date = today.getDate();
  var daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
  var monthList = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];
  document.getElementById("date-and-day").innerText = daylist[day] + ', ' + monthList[month] + ' ' + date;
}

function displayLeftSubTopics() {
  clearItems();
  let id = 1;
  for (menuItem of items) {
    let taskCount = menuItem.task.length;
    let subElements = document.createElement("div");
    let title = document.createElement("div");
    let count = document.createElement("div");
    subElements.setAttribute("class", "menu-item");
    subElements.setAttribute("id", id);
    title.setAttribute("class", "left-option-heading");
    title.setAttribute("id", id);
    title.innerHTML = menuItem.title;
    count.setAttribute("class", "menu-count");

    if (1 <= taskCount) {
      count.innerHTML = taskCount;
    }

    subElements.appendChild(title);
    subElements.appendChild(count);
    document.getElementsByClassName("left-options")[0].appendChild(subElements);
    id++;
  }
}

function clearItems() {
  let menuList = document.getElementsByClassName("left-options")[0];
  let first = menuList.firstElementChild;
  while (first) {
    first.remove();
    first = menuList.firstElementChild;
  }
}

document.getElementById("input-list").addEventListener("keydown", addList);

function addList(event) {
  var inputList = document.getElementById("input-list").value;
  if (13 == event.keyCode && "" == !inputList) {
    let subList = { id: items.length + 1, title: inputList, task: [] }
    items.push(subList);
    displayLeftSubTopics();
    document.getElementById("input-list").value = "";
  }
  document.getElementsByClassName("right-heading")[0].innerHTML = inputList;
  renderTaskList(inputList);
  document.getElementById("right-portion").className = "hide";
}

document.getElementsByClassName("left-options")[0].addEventListener('click', function (event) {
  document.getElementById("right-portion").className = "hide";
  for (i = 0; i < items.length; i++) {
    if (event.target.id == i + 1) {
      var title = items[i].title;
      document.getElementsByClassName("right-heading")[0].innerHTML = title;
      renderTaskList(title);
    };
  }
});


document.getElementsByClassName("add-task-input")[0].addEventListener("keydown", addSubTask);

function addSubTask(event) {
  let subTask = document.getElementsByClassName("add-task-input")[0].value;
  if (13 == event.keyCode && "" == !subTask) {
    title = document.getElementsByClassName("right-heading")[0].innerHTML;
    for (let item of items) {
      if (item.title == title) {
        let newadd = { taskId: item.task.length + 1, completed: false, content: subTask, stepTask: [] };
        item.task.push(newadd);
      }
    }
    document.getElementsByClassName("add-task-input")[0].value = "";
    renderTaskList(title);
    displayLeftSubTopics();
  }
}

function renderTaskList(title) {
  clearList("task-list");
  clearList("completed-task-list");
  let taskId = 1;
  let completedCount = 0;
  for (let item of items) {
    if (item.title == title) {
      for (let task of item.task) {
        let newTaskContainer = document.createElement("div");
        let subTaskButton = document.createElement("div");
        let button = document.createElement("div");
        let taskContent = document.createElement("div");
        let starIconContainer = document.createElement("div");
        let starIcon = document.createElement("div");
        newTaskContainer.setAttribute("class", "sub-task-container");
        newTaskContainer.setAttribute("id", taskId);
        button.setAttribute("id", taskId);
        subTaskButton.setAttribute("class", "sub-task-button-container");
        taskContent.setAttribute("class", "sub-task-content");
        taskContent.setAttribute("id", taskId);
        starIconContainer.setAttribute("class", "sub-task-star-icon-container");
        starIcon.setAttribute("class", "far fa-star");
        subTaskButton.setAttribute("id", taskId);
        taskContent.innerHTML = task.content;
        subTaskButton.appendChild(button);
        starIconContainer.appendChild(starIcon);
        newTaskContainer.appendChild(subTaskButton);
        newTaskContainer.appendChild(taskContent);
        newTaskContainer.appendChild(starIconContainer);
        taskId++;

        if (task.completed === false) {
          button.setAttribute("class", "fa fa-circle-o");
          document.getElementsByClassName("task-list")[0].appendChild(newTaskContainer);
          completedTask();
        } else {
          taskContent.setAttribute("class", "completed-sub-task-content");
          button.setAttribute("class", "fas fa-check-circle");
          document.getElementsByClassName("completed-task-list")[0].appendChild(newTaskContainer);
          inCompletedTask();
          completedCount++;
        }
      }
      if (completedCount >= 1) {
        document.getElementById("completed-task-title").innerHTML = "Completed";
        document.getElementById("completed-arrow-icon").setAttribute("class", "fas fa-chevron-down");
        document.getElementById("completed-count").innerHTML = completedCount;
      } else {
        document.getElementById("completed-task-title").innerHTML = "";
        document.getElementById("completed-arrow-icon").setAttribute("class", "");
        document.getElementById("completed-count").innerHTML = "";
      }
    }
  }
}


function completedTask() {
  let taskList = document.querySelector(".task-list");
  let subTaskContainer = taskList.querySelectorAll(".sub-task-container");
  for (let task of subTaskContainer) {
    let taskIcons = task.querySelectorAll(":scope > .sub-task-button-container");
    for (let taskIcon of taskIcons) {
      taskIcon.addEventListener("click", function (event) {
        let title = document.getElementsByClassName("right-heading")[0].innerHTML;
        for (let item of items) {
          if (item.title == title) {
            for (let task of item.task) {
              if (event.target.id == task.taskId) {
                task.completed = true;
              }
            }
          }
        }
        renderTaskList(title);
      })
    }
  }
}

function inCompletedTask() {
  let taskList = document.querySelector(".completed-task-list");
  let subTaskContainer = taskList.querySelectorAll(".sub-task-container");
  for (let task of subTaskContainer) {
    let taskIcons = task.querySelectorAll(":scope > .sub-task-button-container");
    for (let taskIcon of taskIcons) {
      taskIcon.addEventListener("click", function (event) {
        let title = document.getElementsByClassName("right-heading")[0].innerHTML;
        for (let item of items) {
          if (item.title == title) {
            for (let task of item.task) {
              if (event.target.id == task.taskId) {
                task.completed = false;
              }
            }
          }
        }
        renderTaskList(title);
      })
    }
  }
}

function clearList(className) {
  let menuList = document.getElementsByClassName(className)[0];
  let first = menuList.firstElementChild;
  while (first) {
    first.remove();
    first = menuList.firstElementChild;
  }
}

document.getElementById("menu-icon").addEventListener("click", function () {
  document.getElementById("left-portion").className = "hide";
  document.getElementById("additional-menu-icon").className = "appear";
});

document.getElementById("additional-menu-icon").addEventListener("click", function () {
  document.getElementById("left-portion").className = "left-portion";
  document.getElementById("additional-menu-icon").className = "hide";
});

document.getElementById("add-task-input").addEventListener("click", function () {
  document.getElementById("addtask-additional-options").className = "additonal-option-display";
});

function renderStepTaskTitle() {
  document.getElementsByClassName("task-list-container")[0].addEventListener("click", function (event) {
    document.getElementById("right-portion").className = "right-portion-appear";
    clearList("step-task-container");
    let title = document.getElementsByClassName("right-heading")[0].innerHTML;
    for (i = 0; i < items.length; i++) {
      if (title == items[i].title) {
        for (j = 0; j < items[i].task.length; j++) {
          if (event.target.id == j + 1) {
            if (items[i].task[j].completed == false) {
              document.getElementById("step-task-head-button").className = "fa fa-circle-o";
              document.getElementById("step-task-title").className = "step-task-title";
              document.getElementById("step-task-title").innerHTML = items[i].task[j].content;
              break;
            } else {
              document.getElementById("step-task-head-button").className = "fas fa-check-circle";
              document.getElementById("step-task-title").className = "completed-step-task-title";
              document.getElementById("step-task-title").innerHTML = items[i].task[j].content;
            }
          }
        }
      }
    }
    renderStepTaskList(title);
  })
}

document.getElementsByClassName("step-task-container")[0].addEventListener("click", function (event) {
  let title = document.getElementsByClassName("right-heading")[0].innerHTML;
  let subTask = document.getElementsByClassName("sub-task-content")[0].innerHTML;
  for (i = 0; i < items.length; i++) {
    if (title == items[i].title) {
      for (j = 0; j < items[i].task.length; j++) {
        if (subTask == items[i].task[j].content) {
          for (k = 0; k < items[i].task[j].stepTask.length; k++) {
            if (event.target.id == k + 1) {
              if (items[i].task[j].stepTask[k].completed == false) {
                items[i].task[j].stepTask[k].completed = true;
              } else {
                items[i].task[j].stepTask[k].completed = false;
              }
            }
          }
        }
      }
    }
  }
  renderStepTaskList(title);
})


function addStepTaskList() {
  document.getElementsByClassName("add-step-input")[0].addEventListener("keydown", function (event) {
    let stepTaskContent = document.getElementsByClassName("add-step-input")[0].value;
    let stepTaskTitle = document.getElementById("step-task-title").innerHTML;
    if (13 == event.keyCode && "" == !stepTaskContent) {
      let title = document.getElementsByClassName("right-heading")[0].innerHTML;
      for (let item of items) {
        if (item.title == title) {
          for (let subTask of item.task) {
            if (subTask.content == stepTaskTitle) {
              let newAdd = { stepTaskId: subTask.stepTask.length + 1, stepTask: stepTaskContent, completed: false };
              subTask.stepTask.push(newAdd);
            }
          }
        }
      }
      document.getElementsByClassName("add-step-input")[0].value = "";
      renderStepTaskList(title);
      console.log(items);
    }
  })
}

function renderStepTaskList(title) {
  clearList("step-task-container");
  let stepTaskTitle = document.getElementById("step-task-title").innerHTML;
  let stepTaskId = 1;
  for (let item of items) {
    if (item.title == title) {
      for (let task of item.task) {
        if (task.content == stepTaskTitle) {
          for (i = 0; i < task.stepTask.length; i++) {
            let stepTaskContainer = document.createElement("div");
            let stepTaskButtonContainer = document.createElement("div");
            let stepTaskButton = document.createElement("div");
            let stepTaskContentElement = document.createElement("div");
            stepTaskContainer.setAttribute("class", "step-task-list-container");
            stepTaskButtonContainer.setAttribute("class", "step-task-button-container");
            stepTaskButton.setAttribute("id", stepTaskId);

            if (task.stepTask[i].completed == false) {
              stepTaskButton.setAttribute("class", "fa fa-circle-o");
              stepTaskContentElement.setAttribute("class", "step-task-content");
            } else {
              stepTaskButton.setAttribute("class", "fas fa-check-circle");
              stepTaskContentElement.setAttribute("class", "completed-step-task-content");
            }

            stepTaskContentElement.innerHTML = task.stepTask[i].stepTask;
            stepTaskButtonContainer.appendChild(stepTaskButton);
            stepTaskContainer.appendChild(stepTaskButtonContainer);
            stepTaskContainer.appendChild(stepTaskContentElement);
            document.getElementsByClassName("step-task-container")[0].appendChild(stepTaskContainer);
            stepTaskId++;
          }
        }
      }
    }
  }
}

