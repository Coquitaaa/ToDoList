let task_list = [];

let addBtn = document.getElementById("addBtn");

let taskCounter = document.getElementById("taskCounter");

let taskCounterContainer = document.getElementById("taskCounterContainer")

addBtn.addEventListener("click",()=>{
    let taskInput = document.getElementById("taskInput");
    let taskTitle = taskInput.value;

    if(taskTitle !== ""){

        task_list.push(taskTitle);

        getTaskList();

        taskInput.value = "";

        getTaskCounter();
        

    }else{
        alert("Debes ingresar un titulo para agregar una tarea");
    }
})


function getTaskList(){
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    task_list.forEach((taskTitle, nroTask) => {

        let task = document.createElement("li");
        task.className = "task"

        let taskName = document.createElement("p");
        taskName.textContent = taskTitle;

        let deleteBtn = document.createElement("button")
        deleteBtn.className = "deleteBtn";
        deleteBtn.textContent = "Listo";

        deleteBtn.addEventListener("click",()=>{deleteTask(nroTask)});

        task.appendChild(taskName);
        task.appendChild(deleteBtn);
        taskList.appendChild(task);

    
    });
}


function deleteTask(nroTask) {

    task_list.splice(nroTask,1);

    getTaskList();
    
    getTaskCounter();
}

taskCounterContainer = document.getElementById("taskCounterContainer");

function getTaskCounter() {
    taskCounter.textContent = `Tareas pendientes: ${task_list.length}`;
    taskCounterContainer.appendChild(taskCounter);
}




