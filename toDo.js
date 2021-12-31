var items = [{ id: 1, title: "My Day", task: [] },
{ id: 2, title: "Important", task: [] },
{ id: 3, title: "Planned", task: [] },
{ id: 4, title: "Assigned to me", task: [] },
{ id: 5, title: "Flagged email", task: [] },
{ id: 6, title: "Task", task: [] }];

(function init() {
  displayLeftSubTopics();
  dateAndDay();
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

console.log(items);

document.getElementsByClassName("add-task-input")[0].addEventListener("keydown", addSubTask);

function addSubTask(event) {
  let subTask = document.getElementsByClassName("add-task-input")[0].value;
  if (13 == event.keyCode && "" == !subTask) {
    title = document.getElementsByClassName("right-heading")[0].innerHTML;
    for (let item of items) {
      if (item.title == title) {
        let newadd = { taskId: item.task.length+1, content: subTask };
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
        let newTask = document.createElement("div");
        newTask.setAttribute("class", "sub-task");
        newTask.setAttribute("id", taskId);
        newTask.innerHTML = task.content;
        document.getElementsByClassName("task-list")[0].appendChild(newTask);
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