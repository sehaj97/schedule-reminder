var today = moment().format('dddd, MMMM DD');
var currentHour = moment().hour();
var currentHourCounter = currentHour;

function createScheduler(hour, timeText){
 var row = $("<tr>").addClass("reminder-10am");
 var col = $("<td>").addClass("p-1 row");
 var timeColText = $("<span>").text(timeText);
 var timeCol = $("<div>").addClass("col-xs-1 d-flex justify-content-center align-items-center p-3").append(timeColText);
 var taskColText = $("<span>").text("10 AM");
 if (hour < currentHour){
    var taskCol = $("<div>").addClass("col bg-secondary bg-gradient text-white d-flex justify-content-start align-items-center").append(taskColText);
}
if (hour === currentHour){
   var taskCol = $("<div>").addClass("col bg-danger bg-gradient text-white d-flex justify-content-start align-items-center").append(taskColText);
}
if (hour > currentHour){
   var taskCol = $("<div>").addClass("col bg-success bg-gradient text-white d-flex justify-content-start align-items-center").append(taskColText);
}
 var saveColText = $("<span>").text("save");
 var saveCol = $("<div>").addClass("col-xs-1 bg-info d-flex justify-content-center align-items-center p-3").append(saveColText);
 col.append(timeCol);
 col.append(taskCol);
 col.append(saveCol);
 row.append(col);
 $("#timeBlocks").append(row);

}

$("#currentDay").text(today);
for (let i = 1; i <= 24; i++) { 
    createScheduler(i, moment(i, "HH").format("hh a"));
}