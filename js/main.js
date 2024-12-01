let task_list = JSON.parse(localStorage.getItem("task_list")) || [];

let completed_tasks = JSON.parse(localStorage.getItem("completed_tasks")) || [];

let addBtn = document.getElementById("addBtn");

let taskCounter = document.getElementById("taskCounter");

let taskCounterContainer = document.getElementById("taskCounterContainer")

let deleteHistoryBtn = document.getElementById("deleteHistoryBtn");

class task{

    constructor(title){
        this.title = title;
    }

}




function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskTitle = taskInput.value;

    if(taskTitle !== ""){

        let currentTime = new Date().getHours() + ":" + new Date().getMinutes();

        task_list.push({title: taskTitle, time: currentTime});

        saveTasks();
        
        getTaskList();

        taskInput.value = "";

        getTaskCounter();
        

    }else{
        swal.fire({
            title: "ingresa una tarea",
            text: "Debes ingresar un titulo para crear una tarea, sino como sabes lo que tienes que hacer?",
            icon: "question",
        })
    }
}
if (addBtn){

    addBtn.addEventListener("click",addTask);

}
if (deleteHistoryBtn){

    deleteHistoryBtn.addEventListener("click", clearHistory);

}

taskInput.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        addTask();
    }
})


function getTaskList(){
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    task_list.forEach((task, nroTask) => {

        let taskElement = document.createElement("li");
        taskElement.className = "task"

        let taskName = document.createElement("p");
        taskName.textContent = `${task.title} - ${task.time}`;

        let deleteBtn = document.createElement("button")
        deleteBtn.className = "deleteBtn";
        deleteBtn.textContent = "Listo";

        deleteBtn.addEventListener("click",()=>{deleteTask(nroTask)});

        taskElement.appendChild(taskName);
        taskElement.appendChild(deleteBtn);
        taskList.appendChild(taskElement);

    
    });
}


function deleteTask(nroTask) {

    completed_tasks.push(task_list[nroTask]);
    saveCompletedTasks();

    task_list.splice(nroTask,1);

    saveTasks();

    getTaskList();
    
    getTaskCounter();
}

function saveCompletedTasks() {
    localStorage.setItem("completed_tasks", JSON.stringify(completed_tasks));
}

function saveTasks() {
    localStorage.setItem("task_list", JSON.stringify(task_list));
    
}


function getTaskCounter() {
    taskCounter.textContent = `Tareas pendientes: ${task_list.length}`;
    taskCounterContainer.appendChild(taskCounter);
}

function getTaskHistoryList(){

    let taskHistoryList = document.getElementById("taskHistoryList");
    taskHistoryList.innerHTML = "";


    completed_tasks.reverse().forEach((task, nroTask)=> {
        let taskElement = document.createElement("li");
        taskElement.className = "task";

        let taskName = document.createElement("p");
        taskName.textContent = `${task.title} - ${task.time}`;

        taskElement.appendChild(taskName);
        taskHistoryList.appendChild(taskElement);
    });

    updateHistoryCounters();
}

function updateHistoryCounters() {
    
    document.querySelector(".finishedTaskHistoryCounter").textContent = `Todas las tareas finalizadas: ${completed_tasks.length}`;
    document.querySelector(".UnfinishedTaskHistoryCounter").textContent = `Tareas sin terminar: ${task_list.length}`;
    
}

if (deleteHistoryBtn){
    
    deleteHistoryBtn.addEventListener("click", clearHistory);

}

function clearHistory() {
    swal.fire({
        title: "¿Estás seguro?",
        text: "Esto eliminará todas las tareas completadas de forma permanente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {


        if (result.isConfirmed) {

            completed_tasks = [];
            saveCompletedTasks();

            getTaskHistoryList();


            swal.fire({
                title: "Eliminado",
                text: "El historial de tareas ha sido eliminado.",
                icon: "success",
            });
        }
    });
}



getTaskList();
getTaskCounter();



