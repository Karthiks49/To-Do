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
    let subElements = document.createElement("div");
    let title = document.createElement("div");
    let count = document.createElement("div");
    subElements.setAttribute("class", "menu-item");
    subElements.setAttribute("id", id);
    title.setAttribute("class", "left-option-heading");
    title.setAttribute("id", id);
    title.innerHTML = menuItem.title;
    count.setAttribute("class", "menu-count");
    subElements.appendChild(title);
    subElements.appendChild(count);
    document.getElementsByClassName("left-options")[0].appendChild(subElements);
    id++;
  }
  document.getElementsByClassName("right-heading")[0].innerHTML = items[0].title;
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
}

document.getElementsByClassName("left-options")[0].addEventListener('click', function (event) {
  for (i = 0; i < items.length; i++) {
    if (event.target.id == i + 1) {
      var title = items[i].title;
      showContent(title);
    };
  }
});

function showContent(title) {
  document.getElementsByClassName("right-heading")[0].innerHTML = title;
  renderTaskList(title);
}

document.getElementsByClassName("add-task-input")[0].addEventListener("keydown", addSubTask);

function addSubTask(event) {
  let subTask = document.getElementsByClassName("add-task-input")[0].value;
  if (13 == event.keyCode && "" == !subTask) {
    title = document.getElementsByClassName("right-heading")[0].innerHTML;
    for (let item of items) {
      if (item.title == title) {
        let newadd = { taskId: item.task.length+1, content: subTask, stepTask:[]};
        item.task.push(newadd);
      }
    }
    document.getElementsByClassName("add-task-input")[0].value = "";
    renderTaskList(title);
    console.log(items);
  }
}

function renderTaskList(title) {
  clearList("task-list");
  let taskId = 1;
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
        button.setAttribute("class", "fa fa-circle-o");
        subTaskButton.setAttribute("class", "sub-task-button-container");
        taskContent.setAttribute("class", "sub-task-content");
        taskContent.setAttribute("id", taskId);
        starIconContainer.setAttribute("class", "sub-task-star-icon-container");
        starIcon.setAttribute("class", "far fa-star");
        newTaskContainer.setAttribute("id", taskId);
        taskContent.innerHTML = task.content;
        subTaskButton.appendChild(button);
        starIconContainer.appendChild(starIcon);
        newTaskContainer.appendChild(subTaskButton);
        newTaskContainer.appendChild(taskContent);
        newTaskContainer.appendChild(starIconContainer);
        document.getElementsByClassName("task-list")[0].appendChild(newTaskContainer);
        taskId++;
      }
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

document.getElementsByClassName("menu-icon")[0].addEventListener("click", function (event){
    document.getElementsByClassName("left-portion")[0].setAttribute("class", "hide");
    document.getElementsByClassName("additional-menu-icon")[0].setAttribute("class", "appear");
})

document.getElementsByClassName("additional-menu-icon")[0].addEventListener("click", function (event){
  document.getElementsByClassName("additional-menu-icon")[0].removeAttribute("class", "appear");
  document.getElementsByClassName("left-portion")[0].removeAttribute("class", "hide");
  document.getElementsByClassName("left-portion")[0].setAttribute("class", "flex-display");
})



function renderStepTaskTitle() {
  document.getElementsByClassName("task-list-container")[0].addEventListener("click", function (event) {
    let title = document.getElementsByClassName("right-heading")[0].innerHTML;
    for (i = 0; i < items.length; i++) {
      if (title == items[i].title) {
        for (j=0; j < items[i].task.length; j++) {
          if (event.target.id == j+1) {
            document.getElementsByClassName("step-task-title")[0].innerHTML = items[i].task[j].content;
          }
        }
      }
    }
  })
}

function addStepTaskList() {
  document.getElementsByClassName("add-step-input")[0].addEventListener("keydown", function (event) {
    let stepTaskContent = document.getElementsByClassName("add-step-input")[0].value;
    let stepTaskTitle = document.getElementsByClassName("step-task-title")[0].innerHTML;
    if (13 == event.keyCode && "" == !stepTaskContent) {
      let title = document.getElementsByClassName("right-heading")[0].innerHTML;
      for (let item of items) {
        if (item.title == title) {
          for (let subTask of item.task) {
            if (subTask.content == stepTaskTitle) {
              let newAdd = { stepTaskId: subTask.stepTask.length + 1, stepTask : stepTaskContent};
              subTask.stepTask.push(newAdd);
            }
          }
        }
      }
      document.getElementsByClassName("add-step-input")[0].value = "";
      renderStepTaskList(title, stepTaskTitle, stepTaskContent);
      console.log(items);
    }
  })
}

function renderStepTaskList(title, stepTaskTitle, stepTaskContent) {
  let stepTaskId = 1;
  for (let item of items) {
    if (item.title == title) {
      for (let task of item.task) {
        if (task.content == stepTaskTitle) {

          let newTaskContainer = document.createElement("div");

          newTaskContainer.setAttribute("class", "step-task-list-content");

          newTaskContainer.setAttribute("id", stepTaskId);
          newTaskContainer.innerHTML = stepTaskContent;

          document.getElementsByClassName("step-task-container")[0].appendChild(newTaskContainer);
          stepTaskId++;
        }
      }
    }
  }
}