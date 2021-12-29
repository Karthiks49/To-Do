var today = new Date();
var day = today.getDay();
var month = today.getMonth();
var date = today.getDate();
var daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById("date-and-day").innerText = daylist[day] + ', ' + monthList[month] + ' ' + date;


var items= ["My Day", "Important", "Planned", "Assigned to me", "Flagged email", "Task"];

for(menuItem of items) {
    let subElements = document.createElement("div");
    let title = document.createElement("div");
    let count = document.createElement("div");
    subElements.setAttribute("class", "menu-item");
    title.setAttribute("class", "left-option-heading");
    title.innerHTML = menuItem;
    count.setAttribute("class", "menu-count");
    subElements.appendChild(title);
    subElements.appendChild(count);
    document.getElementsByClassName("left-options")[0].appendChild(subElements);
}

document.getElementById("input-list").addEventListener("keydown", addList);

function addList(event) {
    if (event.keyCode === 13) {
        var inputList = document.getElementById("input-list").value;
        items.push(inputList);
        let subElements = document.createElement("div");
        let title = document.createElement("div");
        title.setAttribute("class", "left-option-heading");
        title.innerHTML = inputList;
        subElements.appendChild(title);
        document.getElementsByClassName("left-options")[0].appendChild(subElements);
        document.getElementById("input-list").value = "";
        document.getElementById("right-side-header").className = "hide";
        document.getElementById("right-side-new-list-head").className = "appear";
        let listTitle = document.createElement("div");
        listTitle.setAttribute("class", "list-title");
        document.getElementsByClassName("right-side-new-list-head")[0].appendChild(listTitle);
    }
}


console.log(items);


