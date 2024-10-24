let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("add-task-btn").addEventListener("click", addTask);

//Henter ID fra HTML
function addTask() {
  const taskInput = document.getElementById("task-input").value;
  const quantityInput = document.getElementById("quantity-input").value;

  if (taskInput && quantityInput) {
    const task = {
      id: Date.now(),
      task: taskInput,
      quantity: quantityInput,
      done: false,
    };

    //Tilføjer opgave til array
    tasks.push(task);
    saveTasks();
    renderTasks();
    document.getElementById("task-input").value = "";
    document.getElementById("quantity-input").value = "";
  }
}

// Henter HTML elementer
function renderTasks() {
  const todoList = document.getElementById("todo-list");
  const doneList = document.getElementById("done-list");

  todoList.innerHTML = "";
  doneList.innerHTML = "";

  //opretter en ny liste/opgave
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = `${task.quantity} ${task.task}`;

    //Tilføjer iconer
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<i class='fas fa-trash'></i>";
    deleteBtn.classList.add("delete-button");
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    const doneBtn = document.createElement("button");
    doneBtn.innerHTML = "<i class='fas fa-check'></i>";
    doneBtn.classList.add("done-button");

    //lytter efter et klik
    doneBtn.addEventListener("click", () => toggleDone(task.id));

    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);

    //indikerer om opgaven er klaret eller skal klares (mangler at blive pakket eller ej)
    if (task.done) {
      doneList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }
  });
}
//opdaterer opgaverne
function toggleDone(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      task.done = !task.done;
    }
    return task;
  });
  saveTasks();
  renderTasks();
}
//sletter opgave
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Viser eksisterende opgaver som allerede er skrevet når siden indlæses
renderTasks();
