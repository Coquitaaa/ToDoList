let task_list = JSON.parse(localStorage.getItem("task_list")) || [];

let addBtn = document.getElementById("addBtn");

let taskCounter = document.getElementById("taskCounter");

let taskCounterContainer = document.getElementById("taskCounterContainer")



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
        alert("Debes ingresar un titulo para agregar una tarea");
    }
}

addBtn.addEventListener("click",addTask);

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

    task_list.splice(nroTask,1);

    saveTasks();

    getTaskList();
    
    getTaskCounter();
}

function saveTasks() {
    localStorage.setItem("task_list", JSON.stringify(task_list));
    
}


function getTaskCounter() {
    taskCounter.textContent = `Tareas pendientes: ${task_list.length}`;
    taskCounterContainer.appendChild(taskCounter);
}


getTaskList();
getTaskCounter();



