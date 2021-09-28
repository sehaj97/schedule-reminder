var today = moment().format('dddd, MMMM DD');
var currentHour = moment().hour();
var starterHour = 9;
var taskClasses = "";
var tasks = [];

var task = {};

function loadScheduler(){
    for (let i = 0; i < 24; i++) { 
        task = {
            taskId: i,
            taskTime: "",
            taskDetails: "",
        }
        createScheduler(starterHour, moment(starterHour, "HH").format("hh a"), task);
        starterHour++
        if(starterHour === 24){
            starterHour = 0;
        }
    }
}

function createScheduler(hour, timeText, task){
    var row = $("<tr>");
    var col = $("<td>").addClass("p-1 row");
    var timeColText = $("<span>").text(timeText);
    task.taskTime = timeText;
    var timeCol = $("<div>").addClass("col-xs-1 d-flex justify-content-center align-items-center p-3").append(timeColText);
    var taskColText = $("<span>").text(task.taskDetails);

    if (hour < currentHour){
        taskClasses = "col bg-secondary bg-gradient text-white d-flex justify-content-start align-items-center";
    }
    if (hour === currentHour){
        taskClasses = "col bg-danger bg-gradient text-white d-flex justify-content-start align-items-center";
    }
    if (hour > currentHour){
        taskClasses = "col bg-success bg-gradient text-white d-flex justify-content-start align-items-center";
    }
    
    var taskCol = $("<div>").addClass(taskClasses + " task-status").attr("id", "taskDetails-" + task.taskId).append(taskColText);
    var saveColText = $("<i>").addClass("fas fa-save");
    var saveCol = $("<button>").addClass("col-xs-1 btn btn-info d-flex justify-content-center align-items-center p-4 savebtn").attr({"id": "task-" + task.taskId, "disabled": true}).append(saveColText);
    col.append(timeCol);
    col.append(taskCol);
    col.append(saveCol);
    row.append(col);
    $("#timeBlocks").append(row);
    tasks.push(task);
}

function saveTasks() {
    localStorage.setItem("reminder-app-tasks", JSON.stringify(tasks));
};

function loadTasks() {
    var savedTasks = localStorage.getItem("reminder-app-tasks");

    if (!savedTasks) {
      loadScheduler();
      saveTasks();
      return false;
    }
    console.log("Saved tasks found!");
  
    // parse into array of objects
    savedTasks = JSON.parse(savedTasks);
    starterHour = 9;
    $("#timeBlocks").empty();
    // loop through savedTasks array
    for (var i = 0; i < savedTasks.length; i++) {
        createScheduler(starterHour, savedTasks[i].taskTime,savedTasks[i]);
        starterHour++
        if(starterHour === 24){
            starterHour = 0;
        }
    }
  };

$("#currentDay").text(today);
loadTasks();

// task text was clicked
$(".task-status").on("click", function() {
    
    var text = $(this)
    .text()
    .trim();
  
    var oldTaskId = parseInt($(this).attr('id').replace("taskDetails-", ""));
    if ($(".active-save").length === 0) {
        $("#task-"+oldTaskId).attr("disabled", false).addClass("active-save");
    }
    else{
        $("textarea").focus();
        return false;
    }
    var textInput = $("<textarea>").addClass("form-control task-value").val(text);
    $(this).children('span').replaceWith(textInput);
});


 $(".savebtn").on("click", function() {
    
    var taskNewDetails = $(".task-value").val();

    var oldTaskId = parseInt($(this).attr('id').replace("task-", ""));

    console.log(oldTaskId);
    tasks[oldTaskId].taskDetails = taskNewDetails;
    saveTasks();
    loadTasks();
    window.location.reload();

});
