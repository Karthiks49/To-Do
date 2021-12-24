
function hide() {
    document.getElementById("left-portion").style.display = 'none';
    document.getElementById("menu-icon-right").style.display = 'block';
}

function show() {
    document.getElementById("left-portion").style.display = 'block';
    document.getElementById("menu-icon-right").style.display = 'none';
}

function myDay() {
    document.getElementById("myday-add-task-container-additional").style.display = 'none';
    document.getElementById("myday-add-task-container").style.display = 'flex';
    document.getElementById("right-portion-myday").style.display = 'block';
}

function important() {
    document.getElementById("right-portion-myday").style.display = 'none';
}

function addTaskAdditional() {
    document.getElementById("myday-add-task-container").style.display = 'none';
    document.getElementById("myday-add-task-container-additional").style.display = 'block';
}

function dateDay() {
var today = new Date();
var day = today.getDay();
var month = today.getMonth();
var date = today.getDate();
var daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementById("date-and-day").innerText = daylist[day] + ', ' + monthList[month] + ' ' + date;
}
