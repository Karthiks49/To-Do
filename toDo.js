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
  var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  document.getElementById("date-and-day").innerText = daylist[day] + ', ' + monthList[month] + ' ' + date;
}

function displayLeftSubTopics() {

  clearListItems();
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
}

function clearListItems() {
  let menuList = document.getElementsByClassName("left-options")[0];
  let first = menuList.firstElementChild;
  while (first) {
    first.remove();
    first = menuList.firstElementChild;
  }
}

function addList(event) {
  if (event.keyCode === 13) {
    var inputList = document.getElementById("input-list").value;
    let subList = { id: items.length + 1, title: inputList, task: [] }
    items.push(subList);
    displayLeftSubTopics();
    document.getElementById("input-list").value = "";
  }
}

document.getElementById("input-list").addEventListener("keydown", addList);

document.getElementsByClassName("left-options")[0].addEventListener('click', function (event) {
  for (i = 0; i < items.length; i++) {
    if (event.target.id == i + 1) {
      var title = items[i].title;
      showContent(title);
    };
  }
});

function showContent(title) {
  document.getElementsByClassName("myday-font")[0].innerHTML = title;
}


document.getElementsByClassName("add-task-input")[0].addEventListener("click", function () {
  document.getElementsByClassName("addtask-additional-options").className = "flex-display";
})

console.log(items);


function addTaskContentToTaskGroup(event) {
  let id = 1;
  let newTask = document.getElementById("add-task-content").value;
  if (13 == event.keyCode && "" == !newTask) {
    title = document.getElementsByClassName("header-text-middle-container")[0].innerHTML;
    for (let a of taskGroup) {
      if (a.title == title) {
        let newadd = { taskId: id, content: newTask }
        a.task.push(newadd);
        id++;
      }
    }
    document.getElementById("add-task-content").value = "";
    renderTaskList(newTask, title);
  }
}

function renderTaskList(title) {
  clearList("left-options");
  let taskId = 1;
  for (let item of items) {
    if (item.title == title) {
      for (let task of item.task) {
        let newTask = document.createElement("p");
        newTask.setAttribute("class", "task");
        newTask.setAttribute("id", taskId);
        newTask.innerHTML = task.title;
        document.getElementsByClassName("left-options")[0].appendChild(newTask);
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