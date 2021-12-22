function hide() {
    document.getElementById("left-portion").style.display = 'none';
    document.getElementById("menu-icon-right").style.display = 'block';
}

function show() {
    document.getElementById("left-portion").style.display = 'block';
    document.getElementById("menu-icon-right").style.display = 'none';
    
}

function myDay() {
    document.getElementById("right-portion").style.display = 'block';
}

    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","Novermber","December"];
    const date = new Date();
    let day = weekdays[date.getDay()];
    let month = months[date.getMonth()];
    let dateToday = date.getDate();
    document.getElementById("date-and-day").textContent = day;
