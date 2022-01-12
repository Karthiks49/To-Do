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
    $("#date-and-day").text(daylist[day] + ', ' + monthList[month] + ' ' + date);
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
    $(".left-options")[0].appendChild(subElements);
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

$("#input-list").keydown(function (event) {
  var inputList = $("#input-list").val();
  if (13 == event.keyCode && "" == !inputList) {
    let subList = { id: items.length + 1, title: inputList, task: [] }
    items.push(subList);
    displayLeftSubTopics();
    $("#input-list").val("");
  }
  $(".right-heading").text(inputList);
  renderTaskList(inputList);
  $("#right-portion").attr("class", "hide");
});

$(".left-options").click(function (event) {
  $("#right-portion").attr("class", "hide");
  for (i = 0; i < items.length; i++) {
    if (event.target.id == i + 1) {
      var title = items[i].title;
      $(".right-heading").text(title);
      renderTaskList(title);
    };
  }
});

$(".add-task-input").keydown(function (event) {
  let subTask = $(".add-task-input").val();
  if (13 == event.keyCode && "" == !subTask) {
    title = $(".right-heading").text();
    for (let item of items) {
      if (item.title == title) {
        let newadd = { taskId: item.task.length + 1, completed: false, content: subTask, stepTask: [] };
        item.task.push(newadd);
      }
    }
    $(".add-task-input").val("");
    $("#right-portion").attr("class", "hide");
    renderTaskList(title);
    displayLeftSubTopics();
  }
});

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
          $(".task-list")[0].prepend(newTaskContainer);
          completedTask();
        } else {
          taskContent.setAttribute("class", "completed-sub-task-content");
          button.setAttribute("class", "fas fa-check-circle");
          $(".completed-task-list")[0].prepend(newTaskContainer);
          inCompletedTask();
          completedCount++;
        }
      }

      if (completedCount >= 1) {
        $("#completed-task-title").text("Completed");
        $("#completed-arrow-icon").attr("class", "fas fa-chevron-down");
        $("#completed-count").text(completedCount);
      } else {
        $("#completed-task-title").text("");
        $("#completed-arrow-icon").attr("class", "");
        $("#completed-count").text("");
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
        let title = $(".right-heading").text();
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
        let title = $(".right-heading").text();
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

$("#menu-icon").click(function () {
  $("#left-portion").attr("class", "hide");
  $("#additional-menu-icon").attr("class", "appear");
});

$("#additional-menu-icon").click(function () {
  $("#left-portion").attr("class", "left-portion");
  $("#additional-menu-icon").attr("class", "hide");
});

$("#add-task-input").click(function () {
  $("#addtask-additional-options").attr("class", "additional-option-display");;
});

function renderStepTaskTitle() {
  $(".task-list-container").click(function (event) {
    $("#right-portion").attr("class", "right-portion-appear");
    clearList("step-task-container");
    let title = $(".right-heading").text();
    for (i = 0; i < items.length; i++) {
      if (title == items[i].title) {
        for (j = 0; j < items[i].task.length; j++) {
          if (event.target.id == j + 1) {
            if (items[i].task[j].completed == false) {
              $("#step-task-head-button").attr("class", "fa fa-circle-o");
              $("#step-task-title").attr("class", "step-task-title");
              $("#step-task-title").text(items[i].task[j].content);
              break;
            } else {
              $("#step-task-head-button").attr("class", "fas fa-check-circle");
              $("#step-task-title").attr("class", "completed-step-task-title");
              $("#step-task-title").text(items[i].task[j].content);
            }
          }
        }
      }
    }
    renderStepTaskList(title);
  })
}

$(".step-task-container").click(function (event) {
  let title = $(".right-heading").text();
  let subTask = $(".sub-task-content").text();
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
});


function addStepTaskList() {
  $(".add-step-input").keydown(function (event) {
    let stepTaskContent = $(".add-step-input").val();
    let stepTaskTitle = $("#step-task-title").text();
    if (13 == event.keyCode && "" == !stepTaskContent) {
      let title = $(".right-heading").text();
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
      $(".add-step-input").val("");
      renderStepTaskList(title);
      console.log(items);
    }
  })
}

function renderStepTaskList(title) {
  clearList("step-task-container");
  let stepTaskTitle = $("#step-task-title").text();
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
            $(".step-task-container")[0].prepend(stepTaskContainer);
            stepTaskId++;
          }
        }
      }
    }
  }
}

