let task_list = [];

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click",()=>{
    let taskInput = document.getElementById("taskInput");
    let taskTitle = taskInput.value;

    if(taskTitle !== ""){

        task_list.push(taskTitle);

        getTaskList();

        taskInput.value = "";

    }else{
        alert("Debes ingresar un titulo para agregar una tarea");
    }
})


function getTaskList(){
    let taskList = document.getElementById("taskList")
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
    
}



